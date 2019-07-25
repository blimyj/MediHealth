# MediHealth

MediHealth an Android mobile application that keep tracks and reminds the user about their medicinal intake and medical appointments.

## :ledger: Index
* [Motivation](#motivation)

* [Aim](#aim)

* [User Stories](#user-stories)

* [Features](#features)

* [Comparison to Existing/Related Apps](#how-are-we-different-from-similar-platforms)

:muscle: ## Motivation

People often go about their busy lives and have little room in their mind to remember the little things they have to do in order to stay healthy. This includes attending appointments, adhering to medication, supplementation or rehabilitation regimes. Attending an appointment, swallowing a pill or doing your daily wrist exercises seem simple in isolation. However, stack them together  and many people are so busy they will simply forget one of them. For example, many medications need to be taken with food or on an empty stomach. Some patients are on multiple medications that cannot be taken at the same time as others. This can result in a very careful scheduling balancing act every day. 

:mag: ## Aim

We hope to build a user-friendly medical health tracker mobile application that tracks and reminds you of your medicinal intake and medical appointments.

## :book: User Stories
As a patient, Squidward needs to take various medications at differing frequencies. He needs an easy and efficient method of handling these schedules flexibly.

As an outpatient, Squidward has many medical appointments that can range from 1 week to 1 year later. He wants an easy way to keep track of them while being able to see all of them at once.

As a forgetful person, Patrick wants to be reminded to take his medications and check if he has taken his medication.

As a patient who has run out of medication, Patrick wants to be able to find the nearest pharmacy so he can restock his supply. Whether it’s from his workplace or home.

While waiting for his turn at the doctor, Spongebob would like to read some medical news to pass his time.


## :pill: Features
- Medicine Feature
  - A form to input the name, date, time and frequency of the medication for tracking.
  - Notifications will be sent at the specified date and time.
  - Able to update and/or delete the medicine from the database.
- Appointment Feature
  - A form to input the name, date, time and location of the appointment for tracking.
  - Notifications will be sent before the specified date and time.
  - Able to update and/or delete the appointment from the database.
- Profile
  - User will be able to input their details (e.g. Name, Birthday, Height and Weight) upon signing up.
  - Able to edit and update their details at anytime. 
  - Toggle weight to kilogram or pounds.
  - Toggle height to feet or centimetres.
- Maps
  - Able to see user’s current location.
  - In-built maps feature that shows pharmacy locations in Singapore.
  - Search bar for users to find their desired pharmacy.
  - Users will be redirected to Google Maps for directions to the desired pharmacy.
- Medical News
  - We used News API, a simple HTTP REST API for searching and retrieving live articles from all over the web. In particular we searched for medical news and prioritised medical news from Singapore.
- Security (Email verification, hidden API keys from source code, 1 account per email address [Preventing users from creating multiple accounts using the same email address with different authentication providers.])
[Prevent weak passwords from being set via firebase password authentication]
- Spam prevention and 

## :syringe: How are we different from similar platforms?
- **HealthHub SG**
  - It only tracks medical appointments from public hospitals and polyclinics but not private hospitals and clinics. In addition, it does not track appointments for blood donations.
  - There is no reminder functionality for patient’s medicines.
  - It does not have a Maps feature.
  - It does not have a News feature.

- **MyTherapy**
  - It only tracks medication and provides reminders.
  - It does not track appointments nor provide reminders.
  - It does not have a Maps feature.
  - It does not have a News feature.

## :sunny: Usage
###  :electric_plug: Installation
```
$ git clone https://github.com/blimyj/MediHealth.git
$ cd MediHealth
$ npm install
```

###  :package: Commands
For Android,
```
$ react-native run-android
```

##  :wrench: Development
###  :fire: Contribution

Your contributions are always welcome and appreciated. Following are the things you can do to contribute to this project.

1. **Report a bug** <br>
If you think you have encountered a bug, and I should know about it, feel free to report it [here](https://github.com/blimyj/MediHealth/issues) and I will take care of it.

2. **Request a feature** <br>
You can also request for a feature [here](https://github.com/blimyj/MediHealth/issues), and if it is viable, it will be picked for development.  

3. **Create a pull request** <br>
It can't get better than this, your pull request will be appreciated by the community. You can get started by picking up any open issues from [here](https://github.com/blimyj/MediHealth/issues) and make a pull request.

> If you are new to open-source, make sure to check read more about it [here](https://www.digitalocean.com/community/tutorial_series/an-introduction-to-open-source) and learn more about creating a pull request [here](https://www.digitalocean.com/community/tutorials/how-to-create-a-pull-request-on-github).

##  :hammer: Build
- React Native v0.59.9
- React Navigation v3.11.0
- Native Base v2.12.1
- Firebase v6.2.3
- React Native Config v0.11.7
- React Native Elements v1.1.0
- React Native Gesture Handler v1.3.0
- React Native Maps v0.24.2
- React Native Modal DateTime Picker v7.5.0
- React Native Push Notifications v3.1.3
- React Native Searchable Dropdown v1.0.6
- React Native Swipe List View v1.5.8
- React Native Vector Icons v6.5.0
- Moment v2.24.0

## :star2: Credit/Acknowledgment
[Author 1](https://github.com/blimyj)

[Author 2](https://github.com/joloong)
