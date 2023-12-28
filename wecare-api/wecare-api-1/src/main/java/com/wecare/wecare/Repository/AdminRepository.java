package com.wecare.wecare.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.wecare.wecare.Entity.Admin;

public interface AdminRepository extends CrudRepository<Admin, Integer> {
    
    public List<Admin> findByUsernameAndPassword(String username, String password);
}
