import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIssuePostListDB } from "../redux/async/freeBoard";
import styled from "styled-components";
import mixin from "../styles/Mixin";
import IssueBoardBox from "./IssueBoardBox";

const RecommendList = () => {
    const issuePostList = useSelector(state => state.freeBoard.issueList);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIssuePostListDB());
    }, []);

    return (
        <>
            <HeadingWrapper>
                <Heading>오늘의 추천글</Heading>
            </HeadingWrapper>
            <IssueBoardBox
                issueList={issuePostList && issuePostList.slice(0, 5)}
                preview={true}
                boardName="freeboard"
            />
        </>
    );
};

const HeadingWrapper = styled.div`
    border-bottom: 1px solid ${props => props.theme.color.mainGray};
    padding-bottom: 13px;
    margin-top: 57px;
    margin-bottom: 10px;
`;
const Heading = styled.span`
    ${mixin.textProps(30, "regular", "black")}
`;
export default RecommendList;