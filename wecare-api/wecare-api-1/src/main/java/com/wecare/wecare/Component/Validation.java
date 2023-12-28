package com.wecare.wecare.Component;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wecare.wecare.Entity.Logins;
import com.wecare.wecare.Repository.LoginsRepository;

@Component
public class Validation {
    
    @Autowired
    private LoginsRepository loginsRepository;

    public boolean isValidPre(String token){
        if (token != null) {
            List<Logins> foundLogin = this.loginsRepository.findAllByToken(token);
            if(foundLogin.isEmpty()){
                System.out.println("\n Authentication Error : Empty login!");
                return false;
            }
            else{
                if(foundLogin.get(0).getType().equals("patient") || foundLogin.get(0).getType().equals("doctor") || foundLogin.get(0).getType().equals("admin")){
                    return true;
                }
                else{
                    System.out.println("\n Authentication Error : Invalid user login!");
                    return false;
                }
            }
        } else {
            System.out.println("\nAuthentication Error : Token not received!");
            return false;
        }
    }

    public boolean isValidDoc(String token){
        if (token != null) {
            List<Logins> foundLogin = this.loginsRepository.findAllByToken(token);
            if(foundLogin.isEmpty()){
                System.out.println("\n Authentication Error : Empty login!");
                return false;
            }
            else{
                if(foundLogin.get(0).getType().equals("admin") || foundLogin.get(0).getType().equals("doctor")|| foundLogin.get(0).getType().equals("patient")){
                    return true;
                }
                else{
                    System.out.println("\n Authentication Error : Invalid user login!");
                    return false;
                }
            }
        } else {
            System.out.println("\nAuthentication Error : Token not received!");
            return false;
        }
    }

    public boolean isValidNurse(String token){
        if (token != null) {
            List<Logins> foundLogin = this.loginsRepository.findAllByToken(token);
            if(foundLogin.isEmpty()){
                System.out.println("\n Authentication Error : Empty login!");
                return false;
            }
            else{
                if(foundLogin.get(0).getType().equals("admin")){
                    return true;
                }
                else{
                    System.out.println("\n Authentication Error : Invalid user login!");
                    return false;
                }
            }
        } else {
            System.out.println("\nAuthentication Error : Token not received!");
            return false;
        }
    }

    public boolean isValidPatient(String token){
        if (token != null) {
            List<Logins> foundLogin = this.loginsRepository.findAllByToken(token);
            if(foundLogin.isEmpty()){
                System.out.println("\n Authentication Error : Empty login!");
                return false;
            }
            else{
                if(foundLogin.get(0).getType().equals("patient") || foundLogin.get(0).getType().equals("doctor") || foundLogin.get(0).getType().equals("admin")){
                    return true;
                }
                else{
                    System.out.println("\n Authentication Error : Invalid user login!");
                    return false;
                }
            }
        } else {
            System.out.println("\nAuthentication Error : Token not received!");
            return false;
        }
    }

    public boolean isValidAppo(String token){
        if (token != null) {
            List<Logins> foundLogin = this.loginsRepository.findAllByToken(token);
            if(foundLogin.isEmpty()){
                System.out.println("\n Authentication Error : Empty login!");
                return false;
            }
            else{
                if(foundLogin.get(0).getType().equals("patient") || foundLogin.get(0).getType().equals("doctor")){
                    return true;
                }
                else{
                    System.out.println("\n Authentication Error : Invalid user login!");
                    return false;
                }
            }
        } else {
            System.out.println("\nAuthentication Error : Token not received!");
            return false;
        }
    }


}
