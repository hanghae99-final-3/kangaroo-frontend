import React from "react";
import styled from "styled-components";
import { history } from "../../Redux/configureStore";
import mixin from "../../Styles/Mixin";

export default function SlideCard({ post, rank, active }) {
    // 디테일 페이지 바로가기 버튼 이벤트 헨들러
    const onDetailButtonClick = () => {
        history.push(`/freeboard/detail/${post.post_id}`);
    };

    const previewContent = post.content
        .replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi, "")
        .replace(/&nbsp;/gi, "")
        .slice(0, 50);

    const imageNone =
        (post.img_list && post.img_list.length === 0) ||
        post.img_list[0] === "";

    return (
        <CardContainer active={active} onClick={onDetailButtonClick}>
            <Preview imageNone={imageNone}>
                <PreviewTitle active={active}>{post.title}</PreviewTitle>
                <PreviewContent active={active}>
                    {previewContent}
                </PreviewContent>
            </Preview>
            {!imageNone && (
                <PreviewImage
                    src={`http://3.36.90.60/${post.img_list[0]}`}
                    alt={post.title}
                />
            )}
        </CardContainer>
    );
}

//------스타일 컴포넌트------
const CardContainer = styled.div`
    ${mixin.outline("4px solid", "blue2")};
    width: 372px;
    min-height: 192px;
    border-radius: 96px;
    padding: 2.3em;
    position: relative;
    cursor: pointer;
    ${mixin.flexBox("space-between", "center")};
    ${props =>
        props.active &&
        `
            background:${props.theme.color.mainBlue};
            border:none;
        `};
`;

const PreviewTitle = styled.div`
    font-size: 20px;
    margin-bottom: 10px;
    ${props =>
        props.active
            ? mixin.textProps(20, "extraBold", "white")
            : mixin.textProps(20, "extraBold", "gray2")}
`;

const Preview = styled.div`
    width: ${props => (props.imageNone ? "100%" : "60%")};
`;

const PreviewImage = styled.img`
    width: 6.5em;
    height: 6.5em;
    object-fit: cover;
    border-radius: 50%;
`;

const PreviewContent = styled.p`
    font-size: 14px;
    ${mixin.textProps(14, "semiBold", "gray2")};
    ${mixin.textOverflow()}
    ${props =>
        props.active
            ? mixin.textProps(20, "regular", "blue3")
            : mixin.textProps(20, "regular", "gray3")}
`;