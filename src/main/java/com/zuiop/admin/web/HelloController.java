package com.zuiop.admin.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

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

    @GetMapping("/test") // Get 요청 API로 만들어줌 -> spring에서는 RequestMapping(method=RequestMethod.Get)
    public void test(HttpServletResponse httpServletResponse, HttpServletRequest httpServletRequest) throws IOException {
        //httpServletResponse.sendRedirect("test.html");
        httpServletResponse.sendRedirect("test.html");
    }
}
