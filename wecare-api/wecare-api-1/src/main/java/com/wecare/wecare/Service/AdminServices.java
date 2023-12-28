package com.wecare.wecare.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wecare.wecare.Entity.Admin;
import com.wecare.wecare.Repository.AdminRepository;

@Service
public class AdminServices {
    
    @Autowired
    private AdminRepository adminRepository;

    public String[] adminLogin(String username, String pass){
        List<Admin> admin = this.adminRepository.findByUsernameAndPassword(username, pass);
        if (admin != null && !admin.isEmpty()){
            String[] data = new String[2];
            data[0]=""+admin.get(0).getId();
            data[1]="Success";
            return data;
        }else{
            String[] data = new String[2];
            data[0]="";
            data[1]="failed";
            return data;
        }
    }



}
