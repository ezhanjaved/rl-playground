import os

import requests

BASE_URL = os.getenv("BASE_URL", "http://127.0.0.1:8000/")

RESUME_ENDPOINT = "trainer/resume-training"
TRAINING_ENDPOINT = "trainer/export-data"
INFERENCE_ENDPOINT = "trainer/run-model"


def post_request(endpoint, body):
    url = f"{BASE_URL}{endpoint}"

    response = requests.post(url, json=body, timeout=30)

    print("\nAPI:", url)
    print("Status Code:", response.status_code)

    try:
        print("Response JSON:", response.json())
    except Exception:
        print("Response Text:", response.text)

    return response


def test_start_training_api():

    body = {
        "entities": {
            "entity_c46ab4c3-45d3-4186-94a8-64913d02c220": {
                "id": "entity_c46ab4c3-45d3-4186-94a8-64913d02c220",
                "tag": "agent",
                "name": "Mage",
                "capabilities": ["Moveable", "Finder"],
                "position": [-7.796333057501758, 0, -3.552713678800501e-15],
                "rotation": [0, 0, 0],
                "quatRotation": [0, 0, 0, 1],
                "assetRef": "agents/skelton/Skeleton_Mage.glb",
                "animationRef": {
                    "0": "agents/skelton/Rig_Medium_MovementBasic.glb",
                    "1": "agents/skelton/Rig_Medium_General.glb",
                },
                "collider": {"shape": "capsule", "h": 2, "r": 0.3},
                "actuator_type": "walker",
                "targetVisual": False,
                "isDecor": False,
                "isDeposit": False,
                "isPickable": False,
                "isCollectable": False,
                "isTarget": False,
                "last_action": "idle",
                "isAssigned": True,
                "action_space": [
                    "move_up",
                    "move_left",
                    "move_right",
                    "idle",
                    "interact",
                ],
                "observation_space": [
                    "dist_to_nearest_target",
                    "delta_x_to_target",
                    "delta_z_to_target",
                    "in_target_radius",
                ],
                "state_space": {
                    "targetReached": False,
                    "previous_distance_target": None,
                },
                "settings": {"speed": 4},
            },
            "entity_02278075-5498-4f71-8d4a-165443615d56": {
                "id": "entity_02278075-5498-4f71-8d4a-165443615d56",
                "tag": "target",
                "name": "Chest",
                "capabilities": [],
                "position": [0.866990997536234, 0, 3.424128557355729],
                "rotation": [0, 0, 0],
                "quatRotation": [0, 0, 0, 1],
                "assetRef": "resources/chest_gold.gltf",
                "animationRef": None,
                "collider": {"shape": "sphere", "h": 2.5, "r": 0.5},
                "actuator_type": "walker",
                "targetVisual": {"radius": 2},
                "isDecor": "false",
                "isDeposit": False,
                "isPickable": False,
                "isCollectable": False,
                "isTarget": "true",
            },
        },
        "graphs": {
            "graph_301825f0-07f2-4631-b8c6-d20478445b0a": {
                "nodes": [
                    {
                        "data": {"label": "OnEpisodeStart"},
                        "type": "OnEpisodeStartNode",
                        "id": "node_97d25d97-b3c1-43dc-bfed-75b72080074d",
                        "position": {"x": 92, "y": 116},
                        "measured": {"width": 150, "height": 50},
                        "selected": False,
                        "dragging": False,
                    },
                    {
                        "data": {"label": "OnStep"},
                        "type": "OnStepNode",
                        "id": "node_85e96aa3-e8fd-429b-a746-7d63c15fde4c",
                        "position": {"x": 98.89434370892101, "y": 480.6233985258359},
                        "measured": {"width": 150, "height": 50},
                        "selected": False,
                        "dragging": False,
                    },
                    {
                        "data": {
                            "label": "WithInRadius",
                            "entityOne": "Agent",
                            "entityTwo": "Target Object",
                        },
                        "type": "InRadiusNode",
                        "id": "node_1fdb6545-dbed-4cbf-b1d7-787c8d9f2bd4",
                        "position": {"x": 515.7606860210758, "y": 156.98694340367769},
                        "measured": {"width": 400, "height": 176},
                        "selected": False,
                        "dragging": False,
                    },
                    {
                        "data": {
                            "label": "AddReward",
                            "agentId": None,
                            "rewardValue": "300.0",
                        },
                        "type": "AddRewardNode",
                        "id": "node_c91d91ce-c5ab-4b75-9a0f-dda3df042830",
                        "position": {"x": 971.1018001045004, "y": 244.35545958670428},
                        "measured": {"width": 300, "height": 194},
                        "selected": None,
                        "dragging": False,
                    },
                    {
                        "data": {"label": "EndEpisode"},
                        "type": "EndEpisodeNode",
                        "id": "node_5a31ed2b-4c1d-4ca2-b23a-09f453cba1a3",
                        "position": {"x": 1368.1016511892556, "y": 323.72127965050436},
                        "measured": {"width": 150, "height": 50},
                    },
                    {
                        "data": {
                            "label": "IsDistanceLess",
                            "entityOne": "Agent",
                            "entityTwo": "Target Object",
                        },
                        "type": "IsDistanceLessNode",
                        "id": "node_e4938a87-bd79-4943-a2f5-cb592bffc9c8",
                        "position": {"x": 514.1745887492583, "y": 392.26386476457577},
                        "measured": {"width": 400, "height": 242},
                    },
                    {
                        "data": {
                            "label": "AddReward",
                            "agentId": None,
                            "rewardValue": "0.2",
                        },
                        "type": "AddRewardNode",
                        "id": "node_1a703322-e66b-4a37-96b8-ecf4a2f7e159",
                        "position": {"x": 995.6798273083323, "y": 437.58270511694565},
                        "measured": {"width": 300, "height": 194},
                    },
                    {
                        "data": {
                            "label": "IsDeltaXLess",
                            "entityOne": "Agent",
                            "entityTwo": "Target Object",
                        },
                        "type": "IsDeltaXLessNode",
                        "id": "node_b5b12beb-ba81-4946-aec9-247068e5cce0",
                        "position": {"x": 516.2256596410002, "y": 609.9939371749831},
                        "measured": {"width": 400, "height": 176},
                    },
                    {
                        "data": {
                            "label": "AddReward",
                            "rewardValue": "0.05",
                        },
                        "type": "AddRewardNode",
                        "id": "node_f5a0f0be-bf50-4666-b663-f1acc5b4f170",
                        "position": {"x": 1041.7092197258094, "y": 702.9866422139786},
                        "measured": {"width": 300, "height": 194},
                    },
                    {
                        "data": {"label": "TruncateEp", "maxSteps": 1500},
                        "type": "TruncateEpisodeNode",
                        "id": "node_d457456a-2e7f-4d43-be3d-dec3fa857adf",
                        "position": {"x": 506.30481013554447, "y": 842.5907096052832},
                        "measured": {"width": 250, "height": 114},
                    },
                    {
                        "data": {
                            "label": "AddReward",
                            "rewardValue": "-0.05",
                        },
                        "type": "AddRewardNode",
                        "id": "node_d3abebba-2165-4931-a165-1ce68fad6fee",
                        "position": {"x": 1367.625, "y": 577},
                        "measured": {"width": 300, "height": 194},
                    },
                    {
                        "data": {
                            "label": "IsDistanceMore",
                            "entityOne": "Agent",
                            "entityTwo": "Target Object",
                        },
                        "type": "IsDistanceMoreNode",
                        "id": "node_692bd606-13c7-4bb1-b17b-87342777336e",
                        "position": {"x": 475.1782010605225, "y": 1036.1424781376286},
                        "measured": {"width": 400, "height": 176},
                    },
                    {
                        "data": {
                            "label": "AddReward",
                            "rewardValue": "-0.1",
                        },
                        "type": "AddRewardNode",
                        "id": "node_098240b5-7e51-49e8-aa4a-fb6710d4e9a7",
                        "position": {"x": 1038.6102861516295, "y": 955.1810258100386},
                        "measured": {"width": 300, "height": 194},
                    },
                ],
                "edges": [
                    {
                        "source": "node_97d25d97-b3c1-43dc-bfed-75b72080074d",
                        "sourceHandle": None,
                        "target": "node_85e96aa3-e8fd-429b-a746-7d63c15fde4c",
                        "targetHandle": None,
                        "id": "edge_0a5ea3f5-6392-4ab5-9638-3e3d328f3bc4",
                    },
                    {
                        "source": "node_85e96aa3-e8fd-429b-a746-7d63c15fde4c",
                        "sourceHandle": None,
                        "target": "node_1fdb6545-dbed-4cbf-b1d7-787c8d9f2bd4",
                        "targetHandle": None,
                        "id": "edge_6f94f08e-062a-4a2c-a96c-460e4e4c4c4f",
                    },
                    {
                        "source": "node_1fdb6545-dbed-4cbf-b1d7-787c8d9f2bd4",
                        "sourceHandle": "true",
                        "target": "node_c91d91ce-c5ab-4b75-9a0f-dda3df042830",
                        "targetHandle": None,
                        "id": "edge_991e0550-182c-4ec8-90fb-edba7def8278",
                    },
                    {
                        "source": "node_c91d91ce-c5ab-4b75-9a0f-dda3df042830",
                        "sourceHandle": None,
                        "target": "node_5a31ed2b-4c1d-4ca2-b23a-09f453cba1a3",
                        "targetHandle": None,
                        "id": "edge_f4e2c90b-fcd2-4c82-ae13-7853698f29c0",
                    },
                    {
                        "source": "node_85e96aa3-e8fd-429b-a746-7d63c15fde4c",
                        "sourceHandle": None,
                        "target": "node_e4938a87-bd79-4943-a2f5-cb592bffc9c8",
                        "targetHandle": None,
                        "id": "edge_439dcd65-b15d-46db-a532-7e2e9b7b7422",
                    },
                    {
                        "source": "node_e4938a87-bd79-4943-a2f5-cb592bffc9c8",
                        "sourceHandle": "true",
                        "target": "node_1a703322-e66b-4a37-96b8-ecf4a2f7e159",
                        "targetHandle": None,
                        "id": "edge_a171a010-cc7a-4c47-8677-92dbda463fd2",
                    },
                    {
                        "source": "node_85e96aa3-e8fd-429b-a746-7d63c15fde4c",
                        "sourceHandle": None,
                        "target": "node_b5b12beb-ba81-4946-aec9-247068e5cce0",
                        "targetHandle": None,
                        "id": "edge_548ec115-8f93-4dba-a90a-9d64056a5996",
                    },
                    {
                        "source": "node_b5b12beb-ba81-4946-aec9-247068e5cce0",
                        "sourceHandle": "true",
                        "target": "node_f5a0f0be-bf50-4666-b663-f1acc5b4f170",
                        "targetHandle": None,
                        "id": "edge_22464c5b-cdcb-4a5f-8edb-830d3df2b0ea",
                    },
                    {
                        "source": "node_85e96aa3-e8fd-429b-a746-7d63c15fde4c",
                        "sourceHandle": None,
                        "target": "node_d457456a-2e7f-4d43-be3d-dec3fa857adf",
                        "targetHandle": None,
                        "id": "edge_f36944f6-a168-4366-90c3-28976e2c3eca",
                    },
                    {
                        "source": "node_b5b12beb-ba81-4946-aec9-247068e5cce0",
                        "sourceHandle": "false",
                        "target": "node_d3abebba-2165-4931-a165-1ce68fad6fee",
                        "targetHandle": None,
                        "id": "edge_d539424e-c57a-48c9-b36d-f49503a0307e",
                    },
                    {
                        "source": "node_85e96aa3-e8fd-429b-a746-7d63c15fde4c",
                        "sourceHandle": None,
                        "target": "node_692bd606-13c7-4bb1-b17b-87342777336e",
                        "targetHandle": None,
                        "id": "edge_06e8ad31-f5b6-4362-91d7-f268ed7937d0",
                    },
                    {
                        "source": "node_692bd606-13c7-4bb1-b17b-87342777336e",
                        "sourceHandle": "true",
                        "target": "node_098240b5-7e51-49e8-aa4a-fb6710d4e9a7",
                        "targetHandle": None,
                        "id": "edge_c86c6ce5-7107-4376-9379-ea3114230c02",
                    },
                ],
                "name": "Basic Target v2",
                "id": "graph_301825f0-07f2-4631-b8c6-d20478445b0a",
            }
        },
        "assignments": {
            "entity_c46ab4c3-45d3-4186-94a8-64913d02c220": {
                "assignedGraphId": "graph_301825f0-07f2-4631-b8c6-d20478445b0a",
                "assignedConfig": {},
                "createdAt": 1780414099551,
            }
        },
        "user_uid": "4ec1d7b5-2acc-4448-8e23-e6e4c5eda290",
        "modelName": "Navigation Model",
        "envType": "SARL",
        "timesteps": 1000000,
        "highestDistance": 9.315462417931757,
        "spawnMode": "Fixed",
        "randomSpawnAfterEp": None,
    }

    body = normalize_booleans(body)
    response = post_request(TRAINING_ENDPOINT, body)

    assert response.status_code in [200, 201, 202]


def normalize_booleans(obj):
    if isinstance(obj, dict):
        return {key: normalize_booleans(value) for key, value in obj.items()}

    if isinstance(obj, list):
        return [normalize_booleans(item) for item in obj]

    if obj == "true":
        return True

    if obj == "false":
        return False

    return obj


# def test_start_resumption_api():
#     body = {
#         "training_id": "eca381a4-8358-46cf-9509-98a7629890df",
#         "additional_steps": 50000,
#     }
#     response = post_request(RESUME_ENDPOINT, body)
#     assert response.status_code in [200, 201, 202]


# def test_start_inference_api():
#     body = {
#         "model_uid": "1ee1746a-f3ab-461d-b24d-8c8fcc6ed72c",
#         "user_uid": "4ec1d7b5-2acc-4448-8e23-e6e4c5eda290",
#     }

#     response = post_request(INFERENCE_ENDPOINT, body)

#     assert response.status_code in [200, 201, 202]
