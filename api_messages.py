from protorpc import messages

class WisdomMessageRequest(messages.Message):
    text = messages.StringField(1)

class WisdomMessageResponse(messages.Message):
    code = messages.IntegerField(1)
    text = messages.StringField(2)

class WisdomCode(messages.Message):
	code = messages.IntegerField(1)

class WisdomListMessageResponse(messages.Message):
	items = messages.MessageField(WisdomMessageResponse, 1, repeated=True)

class FlagResult(messages.Message):
	result = messages.StringField(1)