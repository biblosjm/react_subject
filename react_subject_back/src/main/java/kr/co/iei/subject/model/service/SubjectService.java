package kr.co.iei.subject.model.service;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.subject.model.dao.SubjectDao;
import kr.co.iei.subject.model.vo.Subject;

@Service
public class SubjectService {

	@Autowired
	private SubjectDao subjectDao;

	public List<Subject> selectSubject(Subject subject) {
		List<Subject> list = subjectDao.selectSubject(subject);
		return list;
	}
}
