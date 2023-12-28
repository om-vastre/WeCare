package com.wecare.wecare.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.wecare.wecare.Entity.Logins;

public interface LoginsRepository extends CrudRepository<Logins, Integer>{

    List<Logins> findAllByToken(String token);

}
