from django.shortcuts import HttpResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from .util import render_json, checkAccessAndClientToken
from .models import ClientTokenStorage, Profile
import json
import uuid

def miners_index(request):
    return HttpResponse("index")

@csrf_exempt
def miners_authenticate(request):
    response = {
        'errorMessage': 'Invalid credentials. Invalid username or password.', 
        'error': 'ForbiddenOperationException'
    }
    code=401

    if request.method == "POST":
        request_json = json.loads(request.body)
        print("The request is: %s" % request_json)
        usr = authenticate(username=request_json['username'], password=request_json['password'])
        accessToken = None

        if usr:

            try:
                tokenStorage = ClientTokenStorage.objects.get(user=usr, token=str(request_json['clientToken']))
                accessToken = str(tokenStorage.access_token)
            except:
                accessToken = str(uuid.uuid4())
                tokenStorage = ClientTokenStorage()
                tokenStorage.user = usr
                tokenStorage.access_token = accessToken
                tokenStorage.client_token = str(request_json['clientToken'])
                tokenStorage.save()

            profile = Profile.objects.get(user=tokenStorage.user)

            response = {
                "accessToken": accessToken,
                "clientToken": str(request_json['clientToken']),
                "availableProfiles": [
                    {
                        "id": profile.unique_id,
                        "name": profile.game_name
                    }
                ],
                "selectedProfile": {
                    "id": profile.unique_id,
                    "name": profile.game_name
                }
            }
            code=200

    return render_json(response, code)


@csrf_exempt
def miners_refresh(request):
    return checkAccessAndClientToken(request)

@csrf_exempt
def miners_join(request):
    response = {
        "id": str(uuid.uuid4()),
        "properties": []
    }

    return render_json(response)


@csrf_exempt
def miners_hasJoined(request):
    response = {
        "id": str(uuid.uuid4()),
        "properties": []
    }

    return render_json(response)