package com.wecare.wecare.Entity;

import java.sql.Date;
import java.sql.Time;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "no")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer No;

    private Date Date;
    private Time Time;
    private String Type;
    private String Status;
 
    @ManyToOne
    // @JsonBackReference
    @JsonIdentityReference(alwaysAsId = true)
    private Doctor doctor;
 
    @ManyToOne
    // @JsonBackReference
    @JsonIdentityReference(alwaysAsId = true)
    private Patient patient;

    @OneToOne
    @JsonIdentityReference(alwaysAsId = true)
    private Prescription prescription;



    public Appointment(Integer no, java.sql.Date date, java.sql.Time time, String type, String status, Doctor doctor,
            Patient patient, Prescription prescription) {
        No = no;
        Date = date;
        Time = time;
        Type = type;
        Status = status;
        this.doctor = doctor;
        this.patient = patient;
        this.prescription = prescription;
    }

    public Appointment() {
    }

    public Integer getNo() {
        return No;
    }

    public void setNo(Integer no) {
        No = no;
    }

    public Date getDate() {
        return Date;
    }

    public void setDate(Date date) {
        Date = date;
    }

    public Time getTime() {
        return Time;
    }

    public void setTime(Time time) {
        Time = time;
    }

    public String getType() {
        return Type;
    }

    public void setType(String type) {
        Type = type;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Prescription getPrescription() {
        return prescription;
    }

    public void setPrescription(Prescription prescription) {
        this.prescription = prescription;
    }

    




}