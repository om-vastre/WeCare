package com.wecare.wecare.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wecare.wecare.Entity.Nurse;
import com.wecare.wecare.Repository.NurseRepository;

@Service
public class NurseService {

    @Autowired
    private NurseRepository nurseRepository;

    public Nurse getNurse(Integer id){
        Optional<Nurse> foundNurse = this.nurseRepository.findById(id);
        if(foundNurse.isPresent()){
            return foundNurse.get();
        }else{
            return null;
        }
    }

    public String createNurse(Nurse newNurse){
        try {
            this.nurseRepository.save(newNurse);
            return "Success";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    public String deleteNurse(Integer id){
        if(id != null){
            this.nurseRepository.deleteById(id);
            return "Success";
        }else{
            return "Invalid Id";
        }
    }

    public List<Nurse> listNurse(){
        Iterable<Nurse> nurses = this.nurseRepository.findAll();
        if(nurses != null){
            List<Nurse> nurseList = new ArrayList<>();
            for (Nurse nurse : nurses) {
                nurseList.add(nurse);
            }
            return nurseList;
        }
        else{
            return null;
        }
    }



}


