package com.wecare.wecare.Repository;

import org.springframework.data.repository.CrudRepository;

import com.wecare.wecare.Entity.Prescription;

public interface PrescriptionRepository  extends CrudRepository<Prescription, Integer>{
    
}
