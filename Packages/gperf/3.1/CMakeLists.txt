cmake_minimum_required(VERSION 3.12)
project(gperf VERSION 3.1
  HOMEPAGE_URL "https://www.gnu.org/software/gperf"
  LANGUAGES "C" "CXX"
  )

include(GNUInstallDirs)
include(CheckCSourceCompiles)

set(PACKAGE_VERSION "${PROJECT_VERSION}")
set(PACKAGE_BUGREPORT "")
set(PACKAGE_URL "${PROJECT_HOMEPAGE_URL}")
set(PACKAGE_TARNAME "")
set(PACKAGE_STRING "${PROJECT_NAME} ${PROJECT_VERSION}")

find_package(Threads)
if (Threads_FOUND)
  if (CMAKE_USE_PTHREADS_INIT)
    set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -pthread")
  endif ()
endif ()

check_c_source_compiles("
#include <sys/types.h>
#include <fcntl.h>
int func(int n) { int dynamic_array[n]; return dynamic_array[0]; }
int main() { return func(2); }
" HAVE_DYNAMIC_ARRAY)

set(gperf_HEADERS
  "src/bool-array.h"
  "src/hash-table.h"
  "src/input.h"
  "src/keyword.h"
  "src/keyword-list.h"
  "src/options.h"
  "src/output.h"
  "src/positions.h"
  "src/search.h"
  "src/version.h"
  "lib/getline.h"
  "lib/getopt.h"
  "lib/hash.h"
  )

set(gperf_SOURCES
  "src/bool-array.cc"
  "src/hash-table.cc"
  "src/input.cc"
  "src/keyword.cc"
  "src/keyword-list.cc"
  "src/main.cc"
  "src/options.cc"
  "src/output.cc"
  "src/positions.cc"
  "src/search.cc"
  "src/version.cc"
  "lib/getline.cc"
  "lib/getopt.c"
  "lib/getopt1.c"
  "lib/hash.cc"
  )

set(gperf_DATAFILES
  "doc/gperf.1"
  "doc/gperf.dvi"
  "doc/gperf.html"
  "doc/gperf.info"
  "doc/gperf.pdf"
  "doc/gperf.ps"
  "doc/gperf.texi"
  )

set(gperf_INCLUDES
  "${CMAKE_CURRENT_BINARY_DIR}"
  "${CMAKE_CURRENT_SOURCE_DIR}/src"
  "${CMAKE_CURRENT_SOURCE_DIR}/lib"
  )

set(gperf_LIBRARIES
  "${CMAKE_DL_LIBS}"
  "${CMAKE_THREAD_LIBS_INIT}"
  )

configure_file("config.h.cmake" "${CMAKE_CURRENT_BINARY_DIR}/config.h" @ONLY)

source_group(TREE "${CMAKE_CURRENT_SOURCE_DIR}" FILES "${gperf_HEADERS}" "${gperf_SOURCES}" "${gperf_DATAFILES}" @ONLY)
add_executable(gperf "${gperf_HEADERS}" "${gperf_SOURCES}" "${gperf_DATAFILES}")
target_include_directories(gperf PRIVATE "$<BUILD_INTERFACE:${gperf_INCLUDES}>")
target_link_libraries(gperf PRIVATE "${gperf_LIBRARIES}")
target_compile_definitions(gperf PRIVATE "${gperf_DEFINITIONS}")

install(TARGETS gperf DESTINATION "${CMAKE_INSTALL_BINDIR}")
install(FILES "doc/gperf.1" DESTINATION "${CMAKE_INSTALL_MANDIR}/man1")
