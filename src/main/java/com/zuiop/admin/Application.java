package com.zuiop.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    // SpringBootApplication 을 이용하기 위해 클래스를 최상단으로 올림
    public static void main(String[] args) {
        // 내장 WAS - 톰켓설치 필요 x
        SpringApplication.run(Application.class,args);
    }
}
