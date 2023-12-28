package com.wecare.wecare.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.wecare.wecare.Entity.Doctor;

public interface DoctorRepository extends CrudRepository<Doctor, Integer> {

    public List<Doctor> findByUsernameAndPassword(String username, String password);
}
