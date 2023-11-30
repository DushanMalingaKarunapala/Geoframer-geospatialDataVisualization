from django.shortcuts import render, redirect
from .forms import SignUpForm, CustomUserChangeForm
from django.contrib import messages
from django.contrib.auth import authenticate, logout, login
from django.contrib.auth.models import User, auth
from weather_api.views import index, result
import json
import requests
from django.contrib.auth.decorators import login_required
from django.contrib.auth import update_session_auth_hash


def home(request):
    return render(request, 'home.html')


def register_user(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            # authanticate and login
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']

            user = authenticate(username=username, password=password)
            login(request, user)
            messages.success(request, "You are Registered to the system")
            return redirect('home')
    else:
        form = SignUpForm()  # if user didnt post the data
        return render(request, "register.html", {'form': form})

    return render(request, "register.html", {'form': form})


def loginuser(request):  # login function
    if request.method == 'POST':
        username = request.POST['username']  # get the values that user enterd
        password = request.POST['password']  # get the values that user enterd
        # authanticate whether the post post values from user are in there in the database username and password fields and store them in the user variable
        user = auth.authenticate(username=username, password=password)

        # if the user is available(which means the database field values and user posted values are maching)
        if user is not None:
            auth.login(request, user)  # give login access to the user
            return redirect('home')  # returen to the home page

        else:
            messages.info(request, 'invalid credintials')
            # return redirect to the login page because credintials are incorrect
            return redirect('login')
    else:
        return render(request, 'login.html')


def logoutuser(request):
    auth.logout(request)  # if user requesr logout , auth. logout will happen
    # and after that it will redirect to  the home page
    return redirect('home')


@login_required
def profile(request):
    if request.method == 'POST':
        form = CustomUserChangeForm(request.POST, instance=request.user)
        if form.is_valid():
            user = form.save(commit=False)

            # Check if a new password is provided
            new_password = form.cleaned_data.get('new_password1')
            if new_password:
                user.set_password(new_password)
                # Ensure the user stays logged in after password change
                update_session_auth_hash(request, user)
            user.save()
            messages.success(request, 'Profile updated successfully!')
            return redirect('myprofile')
        else:
            messages.error(
                request, 'Error updating profile. Please correct the errors.')
    else:
        form = CustomUserChangeForm(instance=request.user)

    return render(request, 'myprofile.html', {'form': form, 'user': request.user})
