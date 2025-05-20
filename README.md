<img src="./readme/title1.svg"/>

<br><br>

<!-- project overview -->
<img src="./readme/title2.svg"/>

> This website transforms any simple story idea into a full comic adventure quickly.
>
> Just type something like “Batman saves the city” and the website generates six action-packed comic scenes, with clear descriptions perfect for artists or AI image tools.
>
> Users can also pick their own hero from a list of characters, or upload a picture of themselves and become the hero of their own comic story!
>
> It's a fun and creative platform for anyone who dreams of seeing themselves or their favorite characters in an epic comic adventure.

<br><br>

<!-- System Design -->
<img src="./readme/title3.svg"/>

### ER Diagram

<img src="./readme/demo/comics_studio_erdiagram.png" style="border-radius: 10px;"/>


### Flow Diagram

<img src="./readme/demo/system_diagram.png"/>

### Component Diagram

<img src="./readme/demo/ComDiagramDone.png"/>



<br><br>

<!-- Project Highlights -->
<img src="./readme/title4.svg"/>

<!-- ### From Idea to Comic in Seconds
Turn any short idea into a full-blown, action-packed comic scene quickly.

### You’re the Star
Upload your photo and become the hero of your comic story.

### Cinematic Visuals, Every Time
Each scene bursts with emotion, movement, and rich comic-style detail.

### Download & Share Anywhere
Download your comics in multiple formats and share them easily on social media, with friends, or anywhere you like. -->

<img src="./readme/demo/Highlights.png"/>

<br><br>

<!-- Demo -->
<img src="./readme/title5.svg"/>

### User Screens

| Login screen                            |  Comic Screen                     |
| --------------------------------------- | ------------------------------------- |
| ![Landing](./readme/demo/login_page.png) | ![fsdaf](./readme/demo/vieiw_Grid.png)|

| Profile screen                            |  Characters Screen                     |
| --------------------------------------- | ------------------------------------- |
| ![Landing](./readme/demo/profile_pg.png) | ![fsdaf](./readme/demo/vieiw_Grid.png)|


| Landing screen                            | Creat Comic Screen                     |
| --------------------------------------- | ------------------------------------- |
| ![Landing](./readme/demo/landinggif.gif) | ![fsdaf](./readme/demo/create-video.gif)|

| ComicBook screen                    |  Comics Screen                     |
| ------------------------------------- |------------------------------------- |
| ![Landing](./readme/demo/best_reading.png) |![fsdaf](./readme/demo/tablet.png)|


<br><br>

<!-- Development & Testing -->
<img src="./readme/title6.svg"/>

### Postman API Testing
- You can view the full API documentation in Postman [here](https://documenter.getpostman.com/view/30826163/2sB2qXmiVS).

### Services & Middlewares

| Generate Comic Service       | Saving Panels To Data |
| --------------------------------------- | ------------------------------------- |
| ![Landing](./readme/demo/generateComicService.png) | ![fsdaf](./readme/demo/saveGenerateComicToDbService.png)|

| Authentication Middleware   |   Sequelize Modal Validation   |
| ------------------------------------- | ------------------------------------- |
| ![fsdaf](./readme/demo/AuthMiddleware.png) | ![fsdaf](./readme/demo/ModalValidation.png) |

### Code Test Cases

| Feature Test                            | Unit Test                              |
| --------------------------------------- |  ------------------------------------- |
| ![Landing](./readme/demo/generateComicTestLast.png) | ![fsdaf](./readme/demo/unit_test.png) |



| Local Tests Success                              | Pipeline Tests Success                        |
| --------------------------------------- | ------------------------------------- |
| ![Landing](./readme/demo/test_success_locally.png) | ![fsdaf](./readme/demo/github_tests_success.png)|

<br><br>

<!-- Ai-Powered-Section -->
<img src="./readme/title7.svg"/>

### AI Services Integration OpenAI / ReplicateAI

| Comic Generation Prompt Sample              |
| --------------------------------------- |
| ![Landing](./readme/demo/SchemaGpt.png) |

 | OpenAi Story Generation                    | ReplicateAi Image Generation  |
 | ------------------------------------- | ------------------------------------- |
 | ![fsdaf](./readme/demo/open_ai_code.png) | ![fsdaf](./readme/demo/ReplicateAiUse.png) |

<br><br>


<!-- Deployment -->
<img src="./readme/title8.svg"/>

### Deployment Overview 
  - **Deployed on S3:** [http://fse-final-ali-ah.s3-website.eu-west-3.amazonaws.com/](http://fse-final-ali-ah.s3-website.eu-west-3.amazonaws.com/)
  - Comics Studio deployed using **AWS EC2 instances**:
  - **Staging:** `http://15.236.247.74`
  - **Production:** `http://13.38.76.87`
- The project is **containerized using Docker** to ensure consistency across all environments.
- **CI/CD pipelines** are implemented via **GitHub Actions**, enabling automatic testing and deployment on every push to `staging` and `main`.

| GitHub Deployment Pipeline Success	                        | EC2 Instance Docker Deployed                       |
 | ------------------------------------- | ------------------------------------- |
|![fsdaf](./readme/demo/actions_success_1.png) | ![fsdaf](./readme/demo/ec2_instance_containers_runing.png) |

| AWS project objects	                 | Deployed production website  |   
| --------------------------------------- | ------------------------------------- |
| ![Landing](./readme/demo/objects_s3.png) | ![fsdaf](./readme/demo/deployed.png) |


### CI/CD Pipeline

| Backend Docker Image Build & Test          | Frontend Build And Deploy    |
 | ------------------------------------- | ------------------------------------- |
|![fsdaf](./readme/demo/testing_ec2_pipline.png) | ![fsdaf](./readme/demo/buildFrontS3.png) |

| Copy To EC2 With Injected .env Passwords                 | Backend EC2 Deploy  |   
| --------------------------------------- | ------------------------------------- |
| ![Landing](./readme/demo/copyToEc2_pipeline.png) | ![fsdaf](./readme/demo/buildonec2.png) |



<img src="./readme/demo/ci-cd-pipeline-image.png"/>


<br><br>

<!-- License -->
## License

Comics Studio is available under the MIT License. See the [LICENSE](./LICENSE) file for more info.
<br><br>
