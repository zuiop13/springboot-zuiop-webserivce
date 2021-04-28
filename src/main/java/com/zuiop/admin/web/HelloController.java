package com.zuiop.admin.web;

import com.zuiop.admin.ApplicationConnection;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@RestController //spring에서 메소드마다 @ResponseBody 를 작성했던것을 한꺼번에 해주는 어노테이션
public class HelloController {

    @GetMapping("/hello") // Get 요청 API로 만들어줌 -> spring에서는 RequestMapping(method=RequestMethod.Get)
    public String hello(HttpServletResponse httpServletResponse,HttpServletRequest httpServletRequest) throws IOException {
        String cPath=httpServletRequest.getContextPath();
        System.out.println("테스트 경로"+cPath);

        return "플랜아이 테스트";
    }

    @GetMapping("/frame") // Get 요청 API로 만들어줌 -> spring에서는 RequestMapping(method=RequestMethod.Get)
    public void frame(HttpServletResponse httpServletResponse, HttpServletRequest httpServletRequest) throws IOException {
        //httpServletResponse.sendRedirect("test.html");
        httpServletResponse.sendRedirect("view/html/frame.html");
    }

    @GetMapping("/insertTest") // Get 요청 API로 만들어줌 -> spring에서는 RequestMapping(method=RequestMethod.Get)
    public void insertTest(HttpServletResponse httpServletResponse, HttpServletRequest httpServletRequest) throws IOException {
        String url = "jdbc:postgresql://localhost:5432/springdata";
        String username = "zuiop13";
        String password = "pass";

        try(Connection connection = DriverManager.getConnection(url,username,password)) {
            System.out.println("====================================");
            System.out.println("Test connection created "+connection);

            //create
            //String sql = "create table account (id int,username varchar(255),password varchar(255));";

            //insert 현재 테스트 중입니다.
            String sql = "insert into account VALUES(1,'zuiop13','pass');";

            try(PreparedStatement statement = connection.prepareStatement(sql)){
                statement.execute();
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }
}
