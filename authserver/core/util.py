import json
from django.shortcuts import HttpResponse
from .models import ClientTokenStorage, Profile
import uuid

def render_json(dict_param={}, code=200):
    if len(dict_param) == 0:
        dict_param = {
            "errorMessage" : "Invalid JSON request.",
            "error" : "Method Not Allowed"
        }
        code = 405

    return HttpResponse(json.dumps(dict_param), content_type="application/json", status=code)


def checkAccessAndClientToken(request, refresh=True):
    response = {
        'errorMessage': 'Invalid credentials. Invalid username or password.', 
        'error': 'ForbiddenOperationException'
    }
    code = 403

    if request.method == "POST":
        request_json = json.loads(request.body)

        print("The request is:")
        print(str(request_json))

        try:
            if 'clientToken' in request_json:
                tokenStorage = ClientTokenStorage.objects.get(token=str(request_json['clientToken']), access_token=str(request_json['accessToken']))
                clientToken = str(request_json['clientToken'])
            else:
                tokenStorage = ClientTokenStorage.objects.get(access_token=str(request_json['accessToken']))
                clientToken = tokenStorage.client_token

            if refresh:
                accessToken = str(uuid.uuid4())
                tokenStorage.access_token = accessToken
                tokenStorage.save()
            else:
                accessToken = str(request_json['accessToken'])

            profile = Profile.objects.get(user=tokenStorage.user)

            response = {
                "accessToken": accessToken,
                "clientToken": clientToken,
                "selectedProfile": {
                    "id": profile.unique_id,
                    "name": profile.game_name
                }
            }
            code = 200

        except Exception as e:
            response['errorMessage'] = str(e)
            code = 500

        print("The response is: %s" % response)

    return render_json(response, code)