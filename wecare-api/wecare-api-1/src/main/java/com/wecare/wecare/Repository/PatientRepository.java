package com.wecare.wecare.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.wecare.wecare.Entity.Patient;

public interface PatientRepository extends CrudRepository<Patient, Integer> {

    public List<Patient> findByEmailAndPassword(String email, String password);

}
