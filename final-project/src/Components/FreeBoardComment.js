import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import {
    getFreeCommentListDB,
    addFreeCommentDB,
    editFreeCommentDB,
    deleteFreeCommentDB,
} from "../redux/async/comment";

/**
 * @author kwonjiyeong
 * @param postId : 게시글의 아이디
 * @returns 자유게시판 특정 게시물  댓글리스트 뷰
 * @역할 자유게시판 특정 게시물 댓글리스트 뷰 렌더링
 * @필수값 postId(게시글의 아이디), user(유저정보)
 */

const FreeBoardComment = ({ postId }) => {
    const dispatch = useDispatch();
    const commentList = useSelector(state => state.comment.list);
    const user = useSelector(state => state.user.user);
    const [content, setContent] = useState(""); //댓글 입력값

    useEffect(() => {
        //특정게시물 댓글 가져오기
        dispatch(getFreeCommentListDB(postId));
    }, []);

    const addComment = () => {
        //댓글을 추가하는 기능
        if (user.user_id === undefined) return alert("로그인을 해주세요!");
        const req = {
            user_id: user.user_id,
            post_id: postId,
            content: content,
        };
        dispatch(addFreeCommentDB(req));
        setContent(""); //댓글을 추가하고, 댓글입력칸은 지워줍니다!
    };

    return (
        <>
            <CommentWrite>
                {/* 댓글을 입력 및 추가하는 공간입니다. */}
                <input
                    type="text"
                    onChange={e => setContent(e.target.value)}
                    onKeyPress={e => e.key === "Enter" && addComment()} //엔터키를 눌렀을 때, 코멘트가 추가되도록 설정!
                    value={content} //나중에 댓글을 추가하고 value 값을 지울 때, ref를 사용하지 않고, state를 활용하여 지우기 위해 value props를 설정!
                    placeholder="댓글을 입력해주세요!"
                />
                <button onClick={addComment}>등록</button>
            </CommentWrite>

            {commentList && commentList.length > 0 && (
                <>
                    <h3>댓글 {commentList.length}개</h3>
                    <CommentTable>
                        {/* 댓글의 목록을 나타내는 컴포넌트입니다. */}
                        <TableRow>
                            {/* 댓글의 헤더가 들어가는 공간입니다. */}
                            {/*  */}
                            <div>
                                <span>작성자</span>
                            </div>
                            <div>
                                <span>내용</span>
                            </div>
                            <div>
                                <span>컨트롤러</span>
                            </div>
                        </TableRow>
                        {commentList &&
                            commentList.map(comment => (
                                <TableRow key={comment.comment_id}>
                                    {/* 각 댓글의 데이터들이 들어가는 공간입니다. */}
                                    <TableContent {...comment} />
                                </TableRow>
                            ))}
                    </CommentTable>
                </>
            )}
        </>
    );
};

const CommentWrite = styled.div``;

const CommentTable = styled.div`
    border: 2px solid gray;
    > div:not(:last-child) {
        border-bottom: 1px solid gray;
    }
`;

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    > div {
        padding: 10px;
    }
    > div:not(:last-child) {
        border-right: 1px solid gray;
    }
`;

/**
 * @author kwonjiyeong
 * @param props : {history, location, match}
 * @returns 자유게시판 특정 게시물의 특정 댓글 뷰
 * @역할 자유게시판 특정 게시물의 특정 댓글 뷰 렌더링
 * @필수값 props (부모컴포넌트로부터 댓글의 정보가 담겨져서 온다.)
 */

const TableContent = props => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [content, setContent] = useState(props.content);

    const clickEditBtn = () => {
        //isEdit가 false가 되면 text가 나타나고, true면 input이 나타나게 하는 스위치역할
        setIsEdit(!isEdit);
    };

    const cancelEdit = () => {
        //수정을 하다가 취소버튼을 누를 때, 사용하는 기능
        setContent(props.content);
        setIsEdit(false);
    };

    const editComment = () => {
        //실제적으로 댓글을 수정하는 역할
        const req = {
            comment_id: props.comment_id,
            user_id: props.user.user_id,
            content: content,
        };
        dispatch(editFreeCommentDB(req));
        setIsEdit(false);
        setContent(content);
    };

    const deleteComment = () => {
        //댓글을 삭제하는 역할
        const req = {
            comment_id: props.comment_id,
            user_id: props.user.user_id,
        };
        dispatch(deleteFreeCommentDB(req));
        setIsEdit(false);
        setContent(content);
    };

    return (
        <>
            <div>
                <span>{props.user.nickname}</span>
            </div>
            <div className="changeValue">
                {/* 수정모드면 input이 나타나고, 아니면 text가 나타납니다. */}
                {isEdit ? (
                    <input
                        type="text"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                ) : (
                    <span>{props.content}</span>
                )}
            </div>
            <div>
                {/* 수정모드면 취소,저장버튼이 나타나고, 아니면 수정,삭제버튼이 나타납니다. */}
                {isEdit ? (
                    <>
                        <button onClick={cancelEdit}>취소</button>
                        <button onClick={editComment}>저장</button>
                    </>
                ) : (
                    <>
                        <button onClick={clickEditBtn}>수정</button>
                        <button onClick={deleteComment}>삭제</button>
                    </>
                )}
            </div>
        </>
    );
};

export default FreeBoardComment;
