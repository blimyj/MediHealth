# MediHealth

MediHealth a cross-platform mobile application that keep tracks and reminds the user about the medicine intake, medical appointments, rehabilitation exercises and other important medical biomarkers. 

## Site Map
* [Motivation](#motivation)

* [Aim](#aim)

* [User Stories](#user-stories)

* [Scope of Project](#scope-of-project)

* [Comparison to Existing/Related Apps](#how-are-we-different-from-similar-platforms)

## Motivation

People often go about their busy lives and have little room in their mind to remember the little things they have to do in order to stay healthy. This includes attending appointments, adhering to medication, supplementation or rehabilitation regimes. Attending an appointment, swallowing a pill or doing your daily wrist exercises seem simple in isolation. However, stack them together  and many people are so busy they will simply forget one of them. For example, many medications need to be taken with food or on an empty stomach. Some patients are on multiple medications that cannot be taken at the same time as others. This can result in a very careful scheduling balancing act every day. 

## Aim

We hope to build a user-friendly medical health tracker mobile application that tracks and reminds you of your medicinal intake, medical appointments and other important medical biomarkers.

## User Stories
As a patient, Squidward needs to take various medicines at various frequencies He needs an easy & efficient method of handling  these schedules flexibly.

As an outpatient, Squidward has many medical appointments that can range from 1 week to 1 year later. He wants an easy way to keep track of them while being able to see all of them at once.

As a patient undergoing rehabilitation, Squidward needs to complete certain exercises on a regular basis. He would like to be reminded of them and track how regularly he completes them.

As a doctor I want better accuracy in tracking the patient’s biomarkers variance over time. (Unverified) 

As a physiotherapist, Sandy wants to be able to track patient rehabilitation adherence in order to assess the patient’s condition and adjust treatment plans appropriately. (Unverified) 

As a forgetful person, Patrick wants to check if he has taken his medication.
Worried for Patrick, his mother would also like to receive notifications if he hasn’t taken his medication an hour after the scheduled dose. 

As a person with ADHD, Spongebob would like for his reminder notifications to be ambiguous so  that people don’t know what meds he is taking)

As a responsible father, Mr Krabs would like to track his and his daughters medication from his application.

## Scope of Project

A cross-platform mobile application that keep tracks and reminds the user about the medicine intake, medical appointments, rehabilitation exercises and other important medical biomarkers. 

More specifically:

It tracks the users:
* Medicine / Supplementation Consumption
* Medical Appointments
* Biomarker
* Rehabilitation Exercise Adherence

It reminds the user to:
* Eat their medication / supplements
* Attend upcoming medical appointments
* Assess biomarker
* Complete rehabilitation exercises

### Completed Features
* Medicine Feature
* Appointment Feature
* Input form for Medicine & Appointment
* Login & Profile Page
* Maps
* Set up appointment


### Features to be completed by the Mid of July
* Calendar View (w/o native integration i.e. cannot sync with Google and Apple Calendar yet)
* Toggleable displays for any of the 4 categories
* Medication / Supplementation Segment:
  * Reminder System
    * Pop up screen with drug name and dosage displayed prominently.
    * Three options: “Skip, Take, Remind Me Again” 
      * “Eat now”, “Eaten at” (Or eat now and eaten at together Ask Esther)
  * Display of medication adherence history
  * Flexible Reminder System (in input form example). This feature is so that the reminder times for the second dose onwards can * be scheduled as either a specific time or a time interval after the previous dose has been marked as taken.
* Reschedule Appointments / Set multiple reminders

### Features to be completed by the End of July
* Input form for biomarkers and rehabilitation exercise
* Medication & Supplementation
  * Database of medication (Not exhaustive)
* Biomarkers
  * Display of biomarker history
  * Graph (Bar chart) of biomarker change over time
* Rehabilitation Exercise
  * Display of Exercise adherence history
* Managing other people
  * Dependent (You track for them)
  * Buddy (You receive notification if they miss a dose)

#### Frameworks:
* ReactNative- (NativeBase, Config, Elements, Gesture-Handler,  Navigation, Notifications, Searchable Dropdown)
* Database (Google Firebase - Realtime Database)
* Maps (React Native Maps, Google's Directions API)

## How are we different from similar platforms?
# HealthHub SG
* It only tracks medical appointments from public hospitals and polyclinics but not private hospitals and clinics. In addition, it does not track blood donation appointments.
* It only tracks 3 vitals (blood pressure, blood glucose and BMI).
* There is no reminder functionality for patient’s medicines.

# MediSafe
* Calendar is not easily accessible.
* Does not track or remind about rehabilitation exercises

# MyTherapy:
* Tracks & reminds Medication, Measurement, Activity & Symptom Check
* Does not cover appointments. 
* Cannot add a Custom Activity (or Rehabilitation Exercise) easily 
