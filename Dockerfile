FROM amazoncorretto:17

LABEL authors="sangjun"

CMD ["./gradlew", "clean", "build"]

ARG JAR_FILE=build/libs/*.jar

COPY ${JAR_FILE} app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","/app.jar"]