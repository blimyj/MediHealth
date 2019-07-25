# MediHealth

MediHealth a cross-platform mobile application that keep tracks and reminds the user about the medicine intake, medical appointments, rehabilitation exercises and other important medical biomarkers. 

## :ledger: Index
* [Motivation](#motivation)

* [Aim](#aim)

* [User Stories](#user-stories)

* [Scope of Project](#scope-of-project)

* [Comparison to Existing/Related Apps](#how-are-we-different-from-similar-platforms)

## :muscle: Motivation

People often go about their busy lives and have little room in their mind to remember the little things they have to do in order to stay healthy. This includes attending appointments, adhering to medication, supplementation or rehabilitation regimes. Attending an appointment, swallowing a pill or doing your daily wrist exercises seem simple in isolation. However, stack them together  and many people are so busy they will simply forget one of them. For example, many medications need to be taken with food or on an empty stomach. Some patients are on multiple medications that cannot be taken at the same time as others. This can result in a very careful scheduling balancing act every day. 

## :mag: Aim

We hope to build a user-friendly medical health tracker mobile application that tracks and reminds you of your medicinal intake, medical appointments and other important medical biomarkers.

## :book: User Stories
As a patient, Squidward needs to take various medicines at various frequencies He needs an easy & efficient method of handling  these schedules flexibly.

As an outpatient, Squidward has many medical appointments that can range from 1 week to 1 year later. He wants an easy way to keep track of them while being able to see all of them at once.

As a forgetful person, Patrick wants to check if he has taken his medication.
Worried for Patrick, his mother would also like to receive notifications if he hasn’t taken his medication an hour after the scheduled dose. 

As a person with ADHD, Spongebob would like for his reminder notifications to be ambiguous so  that people don’t know what meds he is taking)

As a responsible father, Mr Krabs would like to track his and his daughters medication from his application.

## :telescope: Scope of Project

A cross-platform mobile application that keep tracks and reminds the user about the medicine intake, medical appointments, rehabilitation exercises and other important medical biomarkers. 

More specifically:

It tracks the users:
* Medicine / Supplementation Consumption
* Medical Appointments


It reminds the user to:
* Eat their medication / supplements
* Attend upcoming medical appointments

## :pill: Features
- Medicine Feature
- Appointment Feature
- Input form for Medicine & Appointment
- Login & Profile Page
- Maps
- Medical News
  - We used News API, a simple HTTP REST API for searching and retrieving live articles from all over the web. In particular we searched for medical news and prioritised medical news from Singapore.
- Notifications 
- Security (Email verification, hidden API keys from source code, 1 account per email address [Preventing users from creating multiple accounts using the same email address with different authentication providers.])
[Prevent weak passwords from being set via firebase password authentication]
- Spam prevention and 

## How are we different from similar platforms?
- **HealthHub SG**
  - It only tracks medical appointments from public hospitals and polyclinics but not private hospitals and clinics. In addition, it does not track blood donation appointments.
  - There is no reminder functionality for patient’s medicines.

- **MyTherapy**
  - Tracks and reminds medication
  - Does not cover appointments 

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
For iOS,
```
$ react-native run-ios
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
