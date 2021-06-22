import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { experimentalStyled, Box } from "@material-ui/core";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

import { useSelector, useDispatch } from "react-redux";
import { userSelector, loginUser, fetchEstadoColegio, clearState } from "../redux/user";
import { useNavigate } from "react-router-dom";
//import Loader from 'react-loader-spinner';
import CircularProgress from "@material-ui/core/CircularProgress";

const DashboardLayoutRoot = experimentalStyled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  height: "100%",
  overflow: "hidden",
  width: "100%",
}));

const DashboardLayoutWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 256,
  },
}));

const DashboardLayoutContainer = experimentalStyled("div")({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
});

const DashboardLayoutContent = experimentalStyled("div")({
  flex: "1 1 auto",
  height: "100%",
  overflow: "auto",
});

const DashboardLayout = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching, isError } = useSelector(userSelector);
  useEffect(() => {
    dispatch(loginUser({ RUT: localStorage.getItem("RUT") }));
    dispatch(fetchEstadoColegio())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
      navigate("/login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return (
    <DashboardLayoutRoot>
      {isFetching ? (
        <Box sx={{ width: "100%", height: "100%", textAlign: 'center'}}>
          <CircularProgress size={100} />
        </Box>
      ) : (
        <>
          <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
          <DashboardSidebar
            onMobileClose={() => setMobileNavOpen(false)}
            openMobile={isMobileNavOpen}
          />
          <DashboardLayoutWrapper>
            <DashboardLayoutContainer>
              <DashboardLayoutContent>
                <Outlet />
              </DashboardLayoutContent>
            </DashboardLayoutContainer>
          </DashboardLayoutWrapper>
        </>
      )}
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;
