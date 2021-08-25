import React, { useState, useEffect } from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//통신
import {
    resetSearchOrder,
    resetTagReducer,
    setSearchOrder,
    setTagReducer,
} from "../../Redux/Modules/freeBoardSlice";

//애니메이션
import Boop from "../../Elements/Animations/Boop";
import { history } from "../../Redux/configureStore";
import PushButton from "../../Elements/Buttons/PushButton";

//머테리얼 ui
import Input from "@material-ui/core/Input";
import CloseIcon from "@material-ui/icons/Close";
import { MuiTheme } from "../../Styles/MuiTheme";
import { makeStyles, MuiThemeProvider } from "@material-ui/core";
import { Select as MuiSelect } from "@material-ui/core";
import DefaultSelector from "../../Elements/Buttons/DefaultSelector";

/**
 * @author heesung
 * @param searchTag
 * @returns 검색창 view
 * @역할 검색 / 태그 선택
 * @필수값  searchTag 검색창 위에 보여지는 tag 배열
 */

const useStyles = makeStyles(theme => ({
    MuiOutlinedInput: {
        fontSize: 18,
        fontWeight: 600,
        color: "#757b80",
    },
}));

const SearchBox = ({ searchTag, deactivateSearch, page, pushButton }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    // 현재 선택되어있는 태그의 index값을 selectedTag 배열에 저장한다.
    const { id } = useParams();
    const [selectedTag, setSelectedTag] = useState(
        id !== undefined ? parseInt(id) : null,
    );
    // 유저가 검색어 입력창에 입력한 값을 searchTerm에 저장한다.
    const [searchTerm, setSearchTerm] = useState("");
    // 로그인 유저의 대학교 id
    const univName = useSelector(state => state.user?.user?.university?.name);
    // 작성일 or  관련순 초기 상태
    const [order, setOrder] = React.useState("date");

    useEffect(() => {
        // selectedTag 상태를 리덕스 스토어의 상태와 동기화
        dispatch(setTagReducer(selectedTag));
    }, [dispatch, selectedTag, id]);

    //태그 클릭 이벤트 핸들링
    const handleTagSelect = e => {
        setSelectedTag(parseInt(e.target.value));
    };

    //태그 리셋 버튼 이벤트 핸들링
    const handleReset = e => {
        setSelectedTag(null);
        dispatch(resetTagReducer());
    };

    //검색어 입력창 onChange 이벤트 핸들링
    const onSearchTermChange = e => {
        setSearchTerm(e.target.value);
    };

    //검색창 form onSubmit 이벤트 핸들링
    const handleSearch = e => {
        e.preventDefault();
        if (searchTerm === "") {
            return window.alert("검색어를 입력해 주세요.");
        }
        if (history.location.pathname.split("/")[1] === "freeboard") {
            history.push(`/freeboard/search/${searchTerm}`);
        } else if (history.location.pathname.split("/")[1] === "univboard") {
            history.push(`/univboard/search/${searchTerm}`);
        }
    };
    // 작성일 or  관련순 정렬  이벤트 핸들링
    const handleOrderChange = event => {
        setOrder(event.target.value);
        if (event.target.value === "rel") {
            dispatch(setSearchOrder("relative"));
        } else {
            dispatch(resetSearchOrder());
        }
    };

    //작성하기 페이지 바로기
    const onClick = () => history.push(`/${page}/write`);

    const handleGoToList = board => history.push(`/${board}`);

    return (
        <React.Fragment>
            <SearchBoxContainer>
                {page && (
                    <TitleContainer>
                        <TitleSpan onClick={() => handleGoToList(page)}>
                            {page === "freeboard"
                                ? "자유 게시판"
                                : `대학 게시판 (${univName})`}
                        </TitleSpan>
                    </TitleContainer>
                )}
                <TagContainer>
                    <TagSelectText>태그 설정</TagSelectText>
                    {searchTag.map((tag, idx) => {
                        // map 함수로 props로 전달된 태그 배열의 태그들 마다 TagButton 컴포넌트 랜더링
                        return (
                            <Boop
                                rotation={0}
                                timing={200}
                                x={0}
                                y={-7}
                                key={idx}
                            >
                                <DefaultSelector
                                    // 선택 여부로 styled component에서 조건부 css 적용(아래 TagButton styled component 참고)
                                    isSelected={selectedTag === idx}
                                    value={idx}
                                    onClick={handleTagSelect}
                                    key={idx}
                                    rightGap="8px"
                                    lastNoGap={searchTag.length - 1 === idx}
                                >
                                    #{tag}
                                </DefaultSelector>
                            </Boop>
                        );
                    })}
                    <CancelButton>
                        <Boop rotation={25}>
                            <CloseIcon onClick={handleReset} />
                        </Boop>
                    </CancelButton>
                </TagContainer>
                {!deactivateSearch && (
                    <InputContainer>
                        <SearchForm onSubmit={handleSearch}>
                            <MuiThemeProvider theme={MuiTheme}>
                                <InputBox
                                    placeholder="UFO에게 무엇이든 물어보세요!"
                                    fullWidth
                                    value={searchTerm}
                                    onChange={onSearchTermChange}
                                    // classes={{ root: classes.MuiOutlinedInput }}
                                    MenuProps={{ disablePortal: true }}
                                    startAdornment={
                                        <Select
                                            MenuProps={{
                                                disablePortal: true,
                                                getContentAnchorEl: null,
                                                anchorOrigin: {
                                                    vertical: "bottom",
                                                },
                                            }}
                                            disableUnderline
                                            value={order}
                                            outlined="false"
                                            onChange={handleOrderChange}
                                        >
                                            <option value={"date"}>
                                                작성일
                                            </option>
                                            <option value={"rel"}>
                                                관련순
                                            </option>
                                        </Select>
                                    }
                                />
                            </MuiThemeProvider>
                        </SearchForm>
                    </InputContainer>
                )}
            </SearchBoxContainer>
        </React.Fragment>
    );
};

export default SearchBox;

//-------스타일 컴포넌트--------
const SearchForm = styled.form``;
const InputContainer = styled.div`
    width: 100%;
`;
const SearchBoxContainer = styled.div`
    margin-bottom: 15px;
`;

const TitleContainer = styled.div`
    margin-bottom: 10px;
    padding-bottom: 10px;
    ${mixin.flexBox("space-between", "flex-end")}
    ${mixin.outline("1.5px solid", "gray4", "bottom")}
`;
const TitleSpan = styled.span`
    cursor: pointer;
    ${mixin.textProps(30, "extraBold", "black")};
`;
const TagContainer = styled.div`
    margin-bottom: 15px;
    ${mixin.flexBox(null, "center", null)}
`;
const TagSelectText = styled.span`
    ${mixin.textProps(14, "semiBold", "gray3")};
    margin-right: 15px;
`;

const CancelButton = styled.button`
    width: 40px;
    height: 30px;
    border: 2px solid white;
    border-radius: 16px;
    text-align: center;
    font-size: ${props => props.theme.fontSize[18]};
    font-weight: ${props => props.theme.fontWeight.regular};
    color: ${props =>
        props.selected ? props.theme.color.white : props.theme.color.gray1};
    background-color: ${props => (props.selected ? "#707071" : "#ffffff")};
`;

const InputBox = styled(Input)`
    .MuiInput-input {
        ${mixin.textProps(18, "semiBold", "gray3")};
    }
`;

const Select = styled(MuiSelect)`
    option {
        cursor: pointer;
    }
    .MuiPaper-root {
        color: ${props => props.theme.color.white};
        background-color: ${props => props.theme.color.mainBlue};
        ${mixin.flexBox("center", null, null, null)}
        ${mixin.textProps(14, "semiBold", "blue3")};
        border-radius: 0 15px 15px 15px;
    }
    .MuiSelect-root {
        padding: 0;
        ${mixin.textProps(12, "semiBold", "gray3")};
        background-color: transparent;
    }
    .MuiSelect-select {
        :focus {
            background-color: transparent;
        }
    }
    .MuiSvgIcon-root.MuiSelect-icon {
        color: ${props => props.theme.color.gray3};
    }
`;