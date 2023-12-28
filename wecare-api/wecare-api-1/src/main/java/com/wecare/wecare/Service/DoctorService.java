package com.wecare.wecare.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wecare.wecare.DTO.DoctorsList;
import com.wecare.wecare.Entity.Appointment;
import com.wecare.wecare.Entity.Doctor;
import com.wecare.wecare.Repository.AppointmentRepository;
import com.wecare.wecare.Repository.DoctorRepository;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public String createDoctor(Doctor newDoctor){
        try {
            this.doctorRepository.save(newDoctor);
            return "Success";
        } catch (Exception e) {
            return e.getMessage();
        }
    }


    public Doctor getDoctor(Integer id){
        Optional<Doctor> gotDoctor =  this.doctorRepository.findById(id);
        if (gotDoctor.isPresent()){
            return gotDoctor.get();
        }else{
            return null;
        }
    }


    public String deleteDoctor(Integer id){
        Optional<Doctor> doctor = doctorRepository.findById(id);
        if(doctor.isPresent()){
            List<Appointment> appointments = doctor.get().getAppointmentList();
            for (Appointment appointment : appointments) {
                appointmentRepository.delete(appointment);
            }
            doctorRepository.delete(doctor.get());
            return ("Success");
        }else{
            return ("Doctor Not Found!");
        }
    }


    public List<DoctorsList> listDoctors(){
        try {
            List<Doctor> allDoctors = (List<Doctor>) this.doctorRepository.findAll();

            List<DoctorsList> doctorsList = new ArrayList<>();

            for (Doctor eachDoctor : allDoctors) {
                DoctorsList listItem = new DoctorsList();

                listItem.setId(eachDoctor.getId());
                listItem.setName(eachDoctor.getName());
                listItem.setType(eachDoctor.getType());
                listItem.setContactNo(eachDoctor.getContactNo());
                listItem.setExperience(eachDoctor.getExperience());
                listItem.setEducation(eachDoctor.getEducation());
                listItem.setUsername(eachDoctor.getUsername());
                listItem.setPassword(eachDoctor.getPassword());

                doctorsList.add(listItem);
            }

            return doctorsList;
        }
        catch (Exception e) {return null;}
    }


    public String[] login(String username, String pass){
        List<Doctor> doctor = this.doctorRepository.findByUsernameAndPassword(username, pass);
        String[] data = new String[2];
        if (doctor != null && !doctor.isEmpty()){
            
            data[0]=""+doctor.get(0).getId();
            data[1]="Success";
            return data;
        }else{
            data[0]="";
            data[1]="failed";
            return data;
        }
    }


}


