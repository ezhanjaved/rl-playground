from dataclasses import dataclass
from typing import Dict, List, Optional


@dataclass
class Node:
    id: str
    data: Dict
    type: str


@dataclass
class Edge:
    id: str
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None


@dataclass
class Graph:
    id: str
    nodes: List[Node]
    edges: List[Edge]
    name: Optional[str] = None
