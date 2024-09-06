# AWS Udacity Image Processing

This project is an image processing application built using AWS services as part of the Udacity Cloud Developer course. The application processes images by applying various filters and transformations.

## Table of Contents

- [About the Project](#about-the-project)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## About the Project

The application allows users to upload images, which are then processed using a predefined filter method.

## Installation

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/t-muehlbauer/aws_udacity_image_processing.git
    cd aws_udacity_image_processing
    ```

2. **Configure AWS CLI**:

    Make sure the AWS CLI is installed and configured (especially your credentials):

    ```bash
    aws configure
    ```

## Usage

### Localhost

- **Domain**: `http://localhost:8082`
- **200 Example**: [Valid request](http://localhost:8082/filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Golden_tabby_and_white_kitten_n01.jpg/1599px-Golden_tabby_and_white_kitten_n01.jpg?20120904132217)
- **422 Example**: [Invalid request](http://localhost:8082/filteredimage?image_url=https://www.youtube.com)

### AWS Elastic Beanstalk (EBS)

- **Domain**: `http://project-dev.us-east-1.elasticbeanstalk.com`
- **200 Example**: [Valid request](http://project-dev.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://api.ardmediathek.de/image-service/images/urn:ard:image:caf5c0d727e1d0d3?w=448&ch=7d286ca194c537c0)
- **422 Example**: [Invalid request](http://project-dev.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://www.youtube.com)

## API Endpoints

- **GET /filteredimage**: Applies filters to an image specified by the `image_url` query parameter.
    - Example of a valid request (200 OK): `http://localhost:8082/filteredimage?image_url=<valid_image_url>`
    - Example of an invalid request (422 Unprocessable Entity): `http://localhost:8082/filteredimage?image_url=<invalid_image_url>`

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE.txt) file for details.
