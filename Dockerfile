FROM alpine:3.8
ARG GRADLE_VERSION=4.9

ENV JAVA_VERSION=8 \
    JAVA_UPDATE=131 \
    JAVA_BUILD=11 \
    JAVA_PATH=d54c1d3a095b4ff2b6607d096fa80163 \
    JAVA_HOME="/usr/lib/jvm/default-jvm" \
    RMI_SERVER_HOSTNAME='localhost' \
    JMX_REMOTE_PORT='9178' \
    GLIBC_VERSION=2.25-r0 \
    LANG=en_US.UTF-8 \
    LOCALE=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8

RUN env

RUN apk add --no-cache --virtual=build-dependencies wget ca-certificates unzip \
&& apk add --no-cache python bash libstdc++ coreutils nodejs-current npm yarn make gcc g++ libpng-dev htop \
&& cd "/tmp" \
&& wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub \
&& wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-${GLIBC_VERSION}.apk \
&& wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-bin-${GLIBC_VERSION}.apk \
&& wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-i18n-${GLIBC_VERSION}.apk \
&& apk add glibc-${GLIBC_VERSION}.apk glibc-i18n-${GLIBC_VERSION}.apk glibc-bin-${GLIBC_VERSION}.apk \
&& /usr/glibc-compat/bin/localedef -i en_US -f UTF-8 en_US.UTF-8 \
&& wget --header "Cookie: oraclelicense=accept-securebackup-cookie;" \
    "http://download.oracle.com/otn-pub/java/jdk/${JAVA_VERSION}u${JAVA_UPDATE}-b${JAVA_BUILD}/${JAVA_PATH}/jdk-${JAVA_VERSION}u${JAVA_UPDATE}-linux-x64.tar.gz" \
&& tar -xzf "jdk-${JAVA_VERSION}u${JAVA_UPDATE}-linux-x64.tar.gz" \
&& mkdir -p "/usr/lib/jvm" \
&& mv "/tmp/jdk1.${JAVA_VERSION}.0_${JAVA_UPDATE}" "/usr/lib/jvm/java-${JAVA_VERSION}-oracle" \
&& ln -s "java-${JAVA_VERSION}-oracle" "$JAVA_HOME" \
&& ln -s "$JAVA_HOME/bin/"* "/usr/bin/" \
&& rm -rf "$JAVA_HOME/"*src.zip \
&& wget --header "Cookie: oraclelicense=accept-securebackup-cookie;" \ 
    "http://download.oracle.com/otn-pub/java/jce/${JAVA_VERSION}/jce_policy-${JAVA_VERSION}.zip" \
&& unzip -jo -d "${JAVA_HOME}/jre/lib/security" "jce_policy-${JAVA_VERSION}.zip" \
&& rm "${JAVA_HOME}/jre/lib/security/README.txt" \
&& java -version

# Cleanup deps
RUN apk del build-dependencies \
&& rm -r "/tmp/"*

# Add user
RUN adduser -D -g "" rms \
&& mkdir -p /opt/rms

# Gradle
RUN wget -O gradle.zip https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip \
&& mkdir -p /opt/gradle \
&& unzip -d /opt/gradle gradle.zip \
&& rm gradle.zip \
&& ln -s /opt/gradle/gradle-${GRADLE_VERSION}/bin/gradle /usr/bin/gradle \
&& chmod 755 /usr/bin/gradle \
&& gradle -v

WORKDIR /opt/rms

# Add app

ADD . .

RUN gradle shadowJar

ENV RMS_IMAGE_ROOT='/opt/rms/img/' \
    RMS_APP_ROOT='/opt/rms/backend/src/main/webapp' \
    RMS_DB_PATH='/opt/rms/db/rms' \
    RMS_PROPS_PATH='/opt/rms/backend/src/main/resources/conf.properties'

RUN mkdir -p $RMS_IMAGE_ROOT

RUN chmod +x scripts/*
CMD ./scripts/run.sh
