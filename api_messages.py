from protorpc import messages

class WisdomMessageRequest(messages.Message):
    text = messages.StringField(1)

class WisdomMessageResponse(messages.Message):
    code = messages.IntegerField(1)
    text = messages.StringField(2)

class RandomMessageRequest(messages.Message):
	current = messages.IntegerField(1)