package com.wecare.wecare;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.wecare.wecare.Entity.Appointment;
import com.wecare.wecare.Entity.Doctor;
import com.wecare.wecare.Repository.DoctorRepository;
	
@SpringBootApplication
public class WecareApplication {

	public static void main(String[] args) {
		// SpringApplication.run(WecareApplication.class, args);

		ApplicationContext context = SpringApplication.run(WecareApplication.class, args);
		// DoctorRepository doctorRepository = context.getBean(DoctorRepository.class);


		// SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yy");

		// Doctor d1 = new Doctor();
		// d1.setId(1);
		// d1.setName("Sushant Pawar");
		// d1.setType("General Consultant");
		// d1.setContactNo("0123456789");
		// d1.setExperience("5");
		// d1.setEducation("B. Tech.");
		// d1.setUsername("sushantpawar");
		// d1.setPassword("Pass@123");

		// List<Appointment> AppoList = new ArrayList<>();

		// Appointment a1 = new Appointment();
		// a1.setNo(1);
		// try {
		// 	a1.setDate(new java.sql.Date(dateFormat.parse("11/10/23").getTime()));
		// 	a1.setTime(Time.valueOf("12:00:00"));
		// } catch (ParseException e) {e.printStackTrace();}
		// // a1.setDate(new java.sql.Date(System.currentTimeMillis()));
		// // a1.setTime(new Time(System.currentTimeMillis()));
		// a1.setDoctor(d1);
		// a1.setType("General Consultant");
		// a1.setStatus("Scheduled");
		// AppoList.add(a1);

		// Appointment a2 = new Appointment();
		// a2.setNo(2);
		// try {
		// 	a2.setDate(new java.sql.Date(dateFormat.parse("11/10/23").getTime()));
		// 	a2.setTime(Time.valueOf("15:00:00"));
		// } catch (ParseException e) {e.printStackTrace();}
		// a2.setDoctor(d1);
		// a2.setType("General Consultant");
		// a2.setStatus("Scheduled");
		// AppoList.add(a2);

		// d1.setAppointmentList(AppoList);

		// doctorRepository.save(d1);
	}

}


