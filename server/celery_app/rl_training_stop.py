from server.celery_app.celery_worker import celery_app
from server.celery_app.connectionPod import connectToPod
from server.database.update import update_model, update_status


@celery_app.task(name="rl_trainer_stop", bind=True, max_retries=3)
def rl_trainer_stop(self, uid: str):
    try:
        remote_cmd = remote_cmd = f"""
        PID_FILE=/workspace/rl-playground/server/pod/training_{uid}.pid
        if [ -f "$PID_FILE" ]; then
            PID=$(cat "$PID_FILE")
            PGID=$(ps -o pgid= -p "$PID" 2>/dev/null | tr -d ' ')
            if [ -n "$PGID" ]; then
                kill -- -"$PGID" 2>/dev/null || true
            else
                kill "$PID" 2>/dev/null || true
            fi
            rm -f "$PID_FILE"
        else
            echo "No PID file for uid {uid}"
        fi
        exit
        """
        connectToPod(remote_cmd)
        update_status(uid, "stopped", "models", "training_id")

    except ConnectionError as e:
        self.retry(exc=e, countdown=10 * (2**self.request.retries))

    except Exception as e:
        update_model(
            uid, {"status": "failed", "error": str(e)}, "models", "training_id"
        )
        raise
