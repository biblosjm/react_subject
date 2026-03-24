package kr.co.iei.subject.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="subject")
public class Subject {
	private Integer subjectNo;
	private String subjectTitle;
	private String subjectInstructor;
	private Integer subjectCategory;
	private Integer subjectLevel;
	private Integer subjectCount;
	private Integer order;
}
