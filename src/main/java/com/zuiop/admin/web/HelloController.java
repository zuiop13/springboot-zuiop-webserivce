package com.zuiop.admin.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController //spring에서 메소드마다 @ResponseBody 를 작성했던것을 한꺼번에 해주는 어노테이션
public class HelloController {

    @GetMapping("/hello") // Get 요청 API로 만들어줌 -> spring에서는 RequestMapping(method=RequestMethod.Get)
    public String hello(){
        return "sdfdfjlhello";
    }
}
