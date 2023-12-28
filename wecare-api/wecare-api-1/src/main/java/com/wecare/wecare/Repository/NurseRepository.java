package com.wecare.wecare.Repository;

import org.springframework.data.repository.CrudRepository;

import com.wecare.wecare.Entity.Nurse;

public interface NurseRepository extends CrudRepository<Nurse, Integer>{
    
}
