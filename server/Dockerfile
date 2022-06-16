FROM maven:3-amazoncorretto-11

WORKDIR /server
COPY . .
RUN mvn clean install
EXPOSE 8080
CMD mvn spring-boot:run
