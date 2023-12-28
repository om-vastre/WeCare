package com.wecare.wecare.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wecare.wecare.Entity.EmailSender;
import com.wecare.wecare.Entity.Prescription;
import com.wecare.wecare.Repository.AppointmentRepository;
import com.wecare.wecare.Repository.PrescriptionRepository;

@Service
public class PrescriptionService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    
    public Prescription getPrescription(Integer Id){
        Optional<Prescription> prescription = this.prescriptionRepository.findById(Id);
        if(prescription.isPresent()){
            return prescription.get();
        }else{
            return null;
        }
    }

    public Prescription createPrescription(Prescription newPrescription){
        try {
            // Prescription savedPre = this.prescriptionRepository.save(newPrescription);
            Prescription addedPre = this.prescriptionRepository.save(newPrescription);
            EmailSender.sendEmail(addedPre);
            return addedPre;
        } catch (Exception e) {
            System.out.println( e.getMessage() );
            return null;
        }
    }

    public String deletePrescription(Integer id){
        Optional<Prescription> prescription = prescriptionRepository.findById(id);
        if(prescription.isPresent()){
            appointmentRepository.delete(prescription.get().getAppointment());
            prescriptionRepository.delete(prescription.get());
            return ("Success");
        }else{
            return ("Prescription Not Found!");
        }
    }



}