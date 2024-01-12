package com.diploma.repository;

import com.diploma.model.ImportedData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImportedDataRepository extends JpaRepository<ImportedData, Long> {

}
