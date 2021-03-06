# Antennae
[![pipeline status](https://gitlab.com/Antmounds/Antennae/badges/develop/pipeline.svg)](https://gitlab.com/Antmounds/Antennae/commits/develop) [![CircleCI](https://circleci.com/gh/Antmounds/antennae.svg?style=svg)](https://circleci.com/gh/Antmounds/antennae) [![](https://images.microbadger.com/badges/image/antmounds/antennae.svg)](https://microbadger.com/images/antmounds/antennae "Get your own image badge on microbadger.com") [![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0) [![Discord Chat](https://img.shields.io/discord/299962468581638144.svg?logo=discord)](https://discord.gg/VtFkvSv)

![Dockerhub stats](http://dockeri.co/image/antmounds/antennae "Official Dockerhub image")

Out-the-box face recognition web app for desktop and mobile. *Trust but verify*


## Introduction
Antennae is a free and open-source face recognition node.js app using [AWS Rekognition](https://aws.amazon.com/rekognition/) to detect and match faces. The app allows you to create collections of 'face prints' and later search an image across any number of selected databases. Each search will also return detected emotions, gender, estimated age range, and other facial features such as the presence of glasses, face hair and smiles. Use cases include allowing you to easily and quickly find missing persons, helping the visually impaired, verifying dates and rendevouz, recognizing celebrities, victim identificaion, and so much more!

Check-in stand mode allows you to set this up for point-of-sale, self-service checkin/out, vip recognition, loyalty rewards programs and greet returning guests by name. Simply by being recognized, allow guests to enter queues, pre-order, confirm options and view current status from their Antennae app. The dashboard shows all guests and where they were recognized. 

This repo features infrastructure code that will allow you to self-host the application using a containerized, highly available, self-repairing, military grade, secure cloud environment. For a managed SaaS solution check out [Antennae Cloud](https://getantennae.com/cloud), featuring private and pre-populated public face print databases, teams, white-label and 24/7 support options.

## Requirements
* **Meteor.js 1.6.13+** 	- Required for development; https://www.meteor.com/install
* **Node.js 10.5.0+** 		- Required for production w/o docker; https://nodejs.org/en/
* **Docker 2.0+**			- Required for testing and production; Free, download and more info at https://docs.docker.com/install/
* **MongoDB** 				- Required for production; running meteor locally comes with mongodb; [Install](https://docs.mongodb.com/manual/installation/) or use a [SaaS](https://mlab.com/)
* **Terraform 0.11.7+** 	- For provisioning cloud infrastructure; [Install Terraform](https://www.terraform.io/intro/getting-started/install.html)
* **AWS Account** 			- Free; If you don't have one you can get one at https://aws.amazon.com/.

## Instructions
### Clone the repository
`$ git clone https://bitbucket.org/Antmounds/antennae.git && cd Antennae/`

### 1) Development
#### Navigate to src/ directory
`$ cd src/`

#### Run Development App
`$ meteor --settings='settings.json'` *App should become available at http://localhost:3000/*
This will allow you to save changes with live reloading of the app in the browser.

### 2) Production
This will build the meteor.js app and then build resulting node.s app as Docker image ready for deployment.

#### Build meteor app
`$ meteor build --directory ../build`

#### Navigate back to root directory
`$ cd ../`

#### Build docker image
`$ docker build -t antmounds/antennae .` *Alternatively run `.circleci/build.sh`. See script for details*

#### Set required MONGO_URL & AWS Environment Variables
```
$ export MONGO_URL=${YOUR_MONGODB_URI}
$ export AWS_ACCESS_KEY_ID=${YOUR_AWS_ACCESS_KEY}
$ export AWS_SECRET_ACCESS_KEY=${YOUR_AWS_SECRET_KEY}
```

#### Run Production App
`$ docker run --rm -d -e MONGO_URL=$MONGO_URL -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY --name antennae -p 3000:3000 antmounds/antennae:latest` *App should become available at http://localhost:3000/*
The app is ready to be deployed to a hosted docker runtime.

## Build Android App
A prebuilt android sdk can be found [here](https://bitbucket.org/Antmounds/antennae/downloads). But these instructions below will show how to build the app yourself.
From the `src/` directory run meteor build command
`$ meteor build android`

## Deployment
This section goes over deploying the docker image to AWS and running it in production with Elastic Container Service [(ECS)](https://aws.amazon.com/ecs)
#### 1) From `infrastructure/` folder, make sure terraform is installed and up-to-date
`$ terraform -v` 

#### 2) Initiate terraform modules
`$ terraform init` 

#### 3) Plan execution
`$ terraform plan` 

#### 4) Deploy resources
`$ terraform apply` 
This will create the following resources:

## Documentation
* Read more about the goals and motivations for this project.
* Follow the getting started guide for basic usage instructions

## Contributing
Pull requests, forks and stars are mucho appreciated and encouraged. See [CONTRIBUTING.md](https://gitlab.com/Antmounds/Antennae/blob/master/CONTRIBUTING.md) for how to get involved in this project.

- #### Get official Antmounds gear!
	<a href="https://streamlabs.com/Antmounds/#/merch">
		<img src="https://cdn.streamlabs.com/merch/panel8.png" width="160">
	</a>
	<a href="https://shop.spreadshirt.com/Antmounds">
		<img src="https://image.spreadshirtmedia.com/content/asset/sprd-logo_horizontal.svg" width="160">
	</a>

- #### Become a Supporter!
	<a href="https://www.patreon.com/antmounds">
		<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
	</a> 

## Get in touch
* :speaking_head: Join the Antmounds [discord](https://discord.gg/VtFkvSv) server for more discussion and support on this project.
* :tv: Watch LIVE development of this app on [YouTube](https://www.youtube.com/Antmounds), [Twitch.tv](https://twitch.tv/Antmounds) and [Mixer](https://mixer.com/Antmounds)
* :clipboard: Use the [issue tracker](https://gitlab.com/Antmounds/Antennae/issues) for bugs, feature requests and enhancements
* :moneybag: For serious business inquiries contact [business@antmounds.com](business@antmounds.com)

## Authors
* [Nick@antmounds](https://gitlab.com/Antmounds) - *initial development*

## License
Copyright © 2018-present Antmounds.com, Inc. or its affiliates. All Rights Reserved.

>This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License, version 3, as published by the Free Software Foundation.

>This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the [GNU Affero General Public License](https://www.gnu.org/licenses/agpl-3.0.en.html) for more details.