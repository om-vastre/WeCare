package com.wecare.wecare.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Nurse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    private String Name;
    private String Salary;
    private String Department;
    private String ContactNo;
    private String Education;
    private String Experience;


    public Nurse() {
    }
    public Nurse(Integer id, String name, String salary, String department, String contactNo, String education,
            String experience) {
        Id = id;
        Name = name;
        Salary = salary;
        Department = department;
        ContactNo = contactNo;
        Education = education;
        Experience = experience;
    }
    public Integer getId() {
        return Id;
    }
    public void setId(Integer id) {
        Id = id;
    }
    public String getName() {
        return Name;
    }
    public void setName(String name) {
        Name = name;
    }
    public String getSalary() {
        return Salary;
    }
    public void setSalary(String salary) {
        Salary = salary;
    }
    public String getDepartment() {
        return Department;
    }
    public void setDepartment(String department) {
        Department = department;
    }
    public String getContactNo() {
        return ContactNo;
    }
    public void setContactNo(String contactNo) {
        ContactNo = contactNo;
    }
    public String getEducation() {
        return Education;
    }
    public void setEducation(String education) {
        Education = education;
    }
    public String getExperience() {
        return Experience;
    }
    public void setExperience(String experience) {
        Experience = experience;
    }

}
