import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type QuestionStatus = 'unvisited' | 'visited' | 'answered' | 'marked' | 'answered_marked';

interface ExamState {
  questions: any[];
  currentIdx: number;
  userAnswers: Record<number, number | null>; 
  statuses: Record<number, QuestionStatus>;   
  timeLeft: number;
  lastResult: any | null;
}

const initialState: ExamState = {
  questions: [],
  currentIdx: 0,
  userAnswers: {},
  statuses: {},
  timeLeft: 0,
  lastResult: null,
};

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    setInitialData: (state, action) => {
       state.questions = action.payload.questions;
       state.timeLeft = action.payload.total_time * 60; 
      
     
      action.payload.questions.forEach((q: any) => {
        state.statuses[q.question_id] = 'unvisited';
      });
     
      if (action.payload.questions.length > 0) {
        state.statuses[action.payload.questions[0].question_id] = 'visited';
      }
    },
    setCurrentIdx: (state, action: PayloadAction<number>) => {
      state.currentIdx = action.payload;
      const qId = state.questions[action.payload].question_id;
       if (state.statuses[qId] === 'unvisited') {
        state.statuses[qId] = 'visited';
      }
    },
    selectOption: (state, action: PayloadAction<{ qId: number, optId: number }>) => {
       state.userAnswers[action.payload.qId] = action.payload.optId;
        const currentStatus = state.statuses[action.payload.qId];
     
       if (currentStatus === 'marked' || currentStatus === 'answered_marked') {
         state.statuses[action.payload.qId] = 'answered_marked';
} else {
         state.statuses[action.payload.qId] = 'answered';
       }
    },
    toggleMarkForReview: (state, action: PayloadAction<number>) => {
        const qId = action.payload;
       const hasAnswer = !!state.userAnswers[qId];
       const currentStatus = state.statuses[qId];

       if (currentStatus === 'marked' || currentStatus === 'answered_marked') {
   
         state.statuses[qId] = hasAnswer ? 'answered' : 'visited';
      } else {
  
         state.statuses[qId] = hasAnswer ? 'answered_marked' : 'marked';
      }
    },
    decrementTimer: (state) => {
      if (state.timeLeft > 0) state.timeLeft -= 1;
    },
      setResult: (state, action) => {
      state.lastResult = action.payload;
    },
        resetExam: (state) => {
      state.questions = [];
      state.currentIdx = 0;
      state.userAnswers = {};
      state.statuses = {};
      state.lastResult = null;
    }
  },
});

  export const { setInitialData, setCurrentIdx, selectOption, toggleMarkForReview, decrementTimer ,setResult,resetExam} = examSlice.actions;
 export default examSlice.reducer;