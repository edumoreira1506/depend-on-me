class Task():
    
        # id: int
        # title: str
        # description: str
        # dependencies: list
        # dependers: list
        # tags: list
    def __init__(self, id: int, title: str, description: str, dependencies: list, dependers: list, tags: list):
        self.id = id
        self.title = title
        self.description = description
        self.dependences = dependencies
        self.dependers = dependers
        self.tags = tags