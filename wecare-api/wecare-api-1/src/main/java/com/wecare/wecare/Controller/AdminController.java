package com.wecare.wecare.Controller;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wecare.wecare.Entity.Logins;
import com.wecare.wecare.Repository.LoginsRepository;
import com.wecare.wecare.Service.AdminServices;
import com.wecare.wecare.Service.DoctorService;
import com.wecare.wecare.Service.PatientService;

import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/api")
public class AdminController {
    
    @Autowired
    private AdminServices adminServices;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private LoginsRepository loginsRepository;

    private static final String CHARS="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


    public static String generateToken(int length) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            sb.append(CHARS.charAt(random.nextInt(CHARS.length())));
        }
        return sb.toString();
    }


    @PostMapping(value="/login")
    public ResponseEntity<String> Login(@RequestParam("username") String username, @RequestParam("password") String password, @RequestParam("type") String usertype) {

        String[] result;
        if(usertype.equals("admin")){
            result = this.adminServices.adminLogin(username, password);
        }
        else if(usertype.equals("doctor")){
            result = this.doctorService.login(username, password);
        }
        else{
            result = this.patientService.login(username, password);
        }

        if(result[1].equals("Success")){
            String token = generateToken(16);
            this.loginsRepository.save(new Logins(0, usertype, null, token));
            return ResponseEntity.ok().body("{\"message\":\"success\",\"token\":\""+ token +"\",\"id\":"+result[0]+"}");
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\":\"Invalid Credentials\"");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> Logout(@RequestParam("token") String token){
        try{
            List<Logins> foundLogin = this.loginsRepository.findAllByToken(token);
            if(!foundLogin.isEmpty()){
                this.loginsRepository.deleteById(foundLogin.get(0).getId());
                return ResponseEntity.status(HttpStatus.OK).body("{\"message\":\"Logout Successful\"}");
            }else{
                return ResponseEntity.status(HttpStatus.OK).body("{\"message\":\"Falied to Logout!\"}");
            }
        } catch (Exception e) {
            System.out.println("Logout Error : "+e);
            return ResponseEntity.status(HttpStatus.OK).body("{\"message\":\"Falied to Logout!\"}");
        }
    }

}
