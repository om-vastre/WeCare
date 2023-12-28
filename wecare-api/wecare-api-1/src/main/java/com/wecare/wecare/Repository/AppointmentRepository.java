package com.wecare.wecare.Repository;

import org.springframework.data.repository.CrudRepository;

import com.wecare.wecare.Entity.Appointment;
import java.util.List;
import com.wecare.wecare.Entity.Doctor;
import com.wecare.wecare.Entity.Patient;


public interface AppointmentRepository extends CrudRepository<Appointment, Integer>{
    
    List<Appointment> findAllByDoctor(Doctor doctor);
    List<Appointment> findAllByPatient(Patient patient);
}
