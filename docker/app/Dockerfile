# Eclipse Temurin provides a well-maintained, fully featured OpenJDK environment
FROM --platform=linux/amd64 eclipse-temurin:8-jdk-focal

# Set environment variables
ENV RMI_SERVER_HOSTNAME='localhost' \
    JMX_REMOTE_PORT='9178'

# Install required system packages
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    python3 \
    make \
    gcc \
    g++ \
    libpng-dev \
    htop \
    curl \
    unzip \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install -y yarn \
    && rm -rf /var/lib/apt/lists/*

# Add user
RUN useradd -m -s /bin/bash rms \
    && mkdir -p /opt/rms

# Install Gradle
ARG GRADLE_VERSION=8.13
RUN wget -O gradle.zip https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip \
    && mkdir -p /opt/gradle \
    && unzip -d /opt/gradle gradle.zip \
    && rm gradle.zip \
    && ln -s /opt/gradle/gradle-${GRADLE_VERSION}/bin/gradle /usr/bin/gradle \
    && chmod 755 /usr/bin/gradle

WORKDIR /opt/rms

# Add app
ADD . .

RUN gradle shadowJar

ENV RMS_IMAGE_ROOT='/opt/rms/img/' \
    RMS_APP_ROOT='/opt/rms/backend/src/main/webapp' \
    RMS_DB_PATH='/opt/rms/db/rms' \
    RMS_PROPS_PATH='/opt/rms/backend/src/main/resources/conf.properties'

RUN mkdir -p $RMS_IMAGE_ROOT

RUN chmod +x docker/app/run.sh
ENTRYPOINT ["/bin/bash", "-c"]
CMD ["./docker/app/run.sh"]
