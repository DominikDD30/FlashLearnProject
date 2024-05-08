FROM ubuntu:latest

# Install Java, Tesseract, and wget
RUN apt-get update && \
    apt-get install -y openjdk-17-jdk tesseract-ocr wget

# Create the directory structure where the traineddata file will be placed
RUN mkdir -p /usr/share/tesseract/tessdata

# Download the eng.traineddata file from GitHub using wget


COPY eng.traineddata /usr/share/tesseract/tessdata/eng.traineddata

# Copy your application JAR file
COPY build/libs/*.jar app.jar

# Set the environment variable for Tesseract datapath
ENV TESSDATA_PREFIX=/usr/share/tesseract/tessdata

# Set the entrypoint for the container
ENTRYPOINT ["java", "-jar", "/app.jar"]
