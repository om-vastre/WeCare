package com.wecare.wecare.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wecare.wecare.DTO.AppointmentListResponse;
import com.wecare.wecare.Entity.Appointment;
import com.wecare.wecare.Entity.Doctor;
import com.wecare.wecare.Entity.Patient;
import com.wecare.wecare.Repository.AppointmentRepository;
import com.wecare.wecare.Repository.DoctorRepository;
import com.wecare.wecare.Repository.PatientRepository;

@Service
public class AppointmentService {
    
    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Autowired
    private DoctorRepository doctorRepository;
    
    @Autowired
    private PatientRepository patientRepository;

    public Appointment getAppointment(Integer id){
        Optional<Appointment> gotAppointment =  this.appointmentRepository.findById(id);
        if (gotAppointment.isPresent()){
            return gotAppointment.get();
        }else{
            return null;
        }
    }

    public String createAppointment(Appointment newAppointment){
        try {
            this.appointmentRepository.save(newAppointment);
            return "Success";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    public String deleteAppointment(Integer Id){
        if(Id != null){
            this.appointmentRepository.deleteById(Id);
            return "Success";
        }else{
            return "Invalid Id";
        }
    }

    public List<AppointmentListResponse> getAppointmentsByDid(Integer id){
        Optional<Doctor> doctor = this.doctorRepository.findById(id);
        if(doctor.isPresent()){
            List<Appointment> listAppo = this.appointmentRepository.findAllByDoctor(doctor.get());

            List<AppointmentListResponse> appoListRespo = new ArrayList<>();
            for (Appointment appointment : listAppo) {
                AppointmentListResponse ne = new AppointmentListResponse();
                ne.setAId(appointment.getNo());
                ne.setPId(appointment.getPatient().getId());
                ne.setPname(appointment.getPatient().getName());
                ne.setDId(appointment.getDoctor().getId());
                ne.setDname(appointment.getDoctor().getName());
                ne.setDate(appointment.getDate().toString());
                ne.setTime(appointment.getTime().toString());
                ne.setType(appointment.getType());
                ne.setStatus(appointment.getStatus());

                appoListRespo.add(ne);
            }
            return appoListRespo;
        }
        return Collections.<AppointmentListResponse>emptyList();
    }


    public List<AppointmentListResponse> getAppointmentsByPid(Integer id){
        Optional<Patient> patient = this.patientRepository.findById(id);
        if(patient.isPresent()){
            List<Appointment> listAppo = this.appointmentRepository.findAllByPatient(patient.get());

            List<AppointmentListResponse> appoListRespo = new ArrayList<>();
            for (Appointment appointment : listAppo) {

                AppointmentListResponse ne = new AppointmentListResponse();
                ne.setAId(appointment.getNo());
                ne.setPId(appointment.getPatient().getId());
                ne.setDId(appointment.getDoctor().getId());
                ne.setDname(appointment.getDoctor().getName());
                ne.setDate(appointment.getDate().toString());
                ne.setTime(appointment.getTime().toString());
                ne.setType(appointment.getType());
                ne.setStatus(appointment.getStatus());

                appoListRespo.add(ne);
            }
            return appoListRespo;
        }
        return Collections.<AppointmentListResponse>emptyList();
    }


}