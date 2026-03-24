import { useEffect, useState } from "react";
import styles from "./App.module.css";
import axios from "axios";
import GradeIcon from "@mui/icons-material/Grade";

function App() {
  //조회한 강의목록 저장할 리스트
  const [subject, setSubject] = useState([]);

  //사용자가 검색하는 제목
  const [title, setTitle] = useState("");
  const [searchTitle, setSearchTitle] = useState("");

  //카테고리 0 : 전체, 1 : 백엔드, 2 : 프론트엔드, 3 : DB
  const [category, setCategory] = useState(0);
  const [searchCategory, setSearchCategory] = useState(0);

  //난이도 0 : 전체, 1 : 초급, 2 : 중급, 3 : 고급
  const [level, setLevel] = useState(0);
  const [searchLevel, setSearchLevel] = useState(0);

  //정렬기준 1 : 작성순, 2 : 난이도 오름차순, 3 : 난이도 내림차순, 4 : 수강인원 오름차순, 5 : 수강인원 내림차순
  const [order, setOrder] = useState(1);

  useEffect(() => {
    axios
      .get(
        `http://192.168.31.22:8989/subjects?subjectTitle=${title}&subjectCategory=${category}&subjectLevel=${level}&order=${order}`,
      )
      .then((res) => {
        console.log(res);
        setSubject(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [title, category, level, order]);

  return (
    <div>
      <header className={styles.header}>
        <h1>강의 목록</h1>
        <div className={styles.wrap}>
          <div className={styles.subject_option_wrap}>
            <div className={styles.option}>
              <form
                className={styles.search_wrap}
                onSubmit={(e) => {
                  e.preventDefault();
                  setTitle(searchTitle);
                  setCategory(searchCategory);
                  setLevel(searchLevel);
                }}
              >
                <select
                  className={styles.select}
                  value={searchCategory}
                  onChange={(e) => {
                    setSearchCategory(e.target.value);
                  }}
                >
                  <option value={0}>전체</option>
                  <option value={1}>백엔드</option>
                  <option value={2}>프론트엔드</option>
                  <option value={3}>DB</option>
                </select>
                <input
                  type="text"
                  value={searchTitle}
                  onChange={(e) => {
                    setSearchTitle(e.target.value);
                  }}
                  className={styles.input}
                />
                <button className={styles.btn} type="submit">
                  검색
                </button>
              </form>
              <select
                className={`${styles.select} ${styles.level}`}
                value={searchLevel}
                onChange={(e) => {
                  setSearchLevel(e.target.value);
                }}
              >
                <option value={0}>전체</option>
                <option value={1}>초급</option>
                <option value={2}>중급</option>
                <option value={3}>고급</option>
              </select>
            </div>
            <div className={styles.order_wrap}>
              <div
                className={order === 1 ? styles.active : ""}
                onClick={() => {
                  setOrder(1);
                }}
              >
                작성순
              </div>
              <div
                className={order === 2 ? styles.active : ""}
                onClick={() => {
                  setOrder(2);
                }}
              >
                난이도 오름차순
              </div>
              <div
                className={order === 3 ? styles.active : ""}
                onClick={() => {
                  setOrder(3);
                }}
              >
                난이도 내림차순
              </div>
              <div
                className={order === 4 ? styles.active : ""}
                onClick={() => {
                  setOrder(4);
                }}
              >
                수강인원 오름차순
              </div>
              <div
                className={order === 5 ? styles.active : ""}
                onClick={() => {
                  setOrder(5);
                }}
              >
                수강인원 내림차순
              </div>
              <div className={styles.div}></div>
              <div
                className={styles.reset}
                onClick={() => {
                  setSearchTitle("");
                  setSearchCategory(0);
                  setSearchLevel(0);
                  setTitle("");
                  setCategory(0);
                  setLevel(0);
                  setOrder(1);
                }}
              >
                초기화
              </div>
            </div>
          </div>
          <div className={styles.subject_list_wrap}>
            <ul className={`${styles.ul} ${styles.nav}`}>
              <li className={styles.no_li}>과목 번호</li>
              <li className={styles.title_li}>과목 이름</li>
              <li className={styles.instructor_li}>담당 강사</li>
              <li className={styles.category_li}>과목 분류</li>
              <li className={styles.level_li}>과목 난이도</li>
              <li className={styles.count_li}>수강 정원</li>
            </ul>
            {subject &&
              subject.map((item) => {
                return (
                  <ul key={"subject-" + item.subjectNo} className={styles.ul}>
                    <li className={styles.no_li}>{item.subjectNo}</li>
                    <li className={styles.title_li}>{item.subjectTitle}</li>
                    <li className={styles.instructor_li}>
                      {item.subjectInstructor}
                    </li>
                    <li className={styles.category_li}>
                      {(item.subjectCategory === 1 && "백엔드") ||
                        (item.subjectCategory === 2 && "프론트엔드") ||
                        (item.subjectCategory === 3 && "DB")}
                    </li>
                    <li
                      className={
                        (item.subjectLevel === 1 &&
                          `${styles.level_li} ${styles.low}`) ||
                        (item.subjectLevel === 2 &&
                          `${styles.level_li} ${styles.mid}`) ||
                        (item.subjectLevel === 3 &&
                          `${styles.level_li} ${styles.hight}`)
                      }
                    >
                      {(item.subjectLevel === 1 && "초급") ||
                        (item.subjectLevel === 2 && "중급") ||
                        (item.subjectLevel === 3 && "고급")}
                    </li>
                    <li className={styles.count_li}>{item.subjectCount}</li>
                  </ul>
                );
              })}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
