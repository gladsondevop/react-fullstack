FROM amazoncorretto:23-alpine-jdk
LABEL org.opencontainers.image.authors="gladsondevop"
COPY ./target/miniaturas-0.0.1-SNAPSHOT.jar /home/miniaturas.jar
WORKDIR /home
CMD ["java", "-jar", "miniaturas.jar"]
EXPOSE 8080