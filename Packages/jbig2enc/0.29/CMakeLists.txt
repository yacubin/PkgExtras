cmake_minimum_required(VERSION 3.10)
project(jbig2enc VERSION 0.29 LANGUAGES C CXX)

include(GNUInstallDirs)

find_package(Leptonica REQUIRED)

set(jbig2enc_PUBLIC_HEADERS
  src/jbig2enc.h
  )

set(jbig2enc_HEADERS
  src/jbig2arith.h
  src/jbig2comparator.h
  src/jbig2segments.h
  src/jbig2structs.h
  src/jbig2sym.h
  )

set(jbig2enc_SOURCES
  src/jbig2arith.cc
  src/jbig2comparator.cc
  src/jbig2enc.cc
  src/jbig2sym.cc
  )

set(jbig2enc_DATAFILES
  # .gitignore
  AUTHORS
  autogen.sh
  ChangeLog
  configure.ac
  COPYING
  doc/jbig2enc.html
  doc/Makefile.am
  doc/PATENTS
  fcd14492.pdf
  INSTALL
  Makefile.am
  NEWS
  # pdf.py
  README.md
  src/Makefile.am
  vs2008/jbig2/jbig2.vcproj
  vs2008/jbig2enc.sln
  vs2008/libjbig2enc/libjbig2enc.vcproj
  )

set(jbig2enc_INCLUDES
  "${CMAKE_CURRENT_BINARY_DIR}"
  "${CMAKE_CURRENT_SOURCE_DIR}"
  )

set(jbig2enc_DEFINITIONS
  _LIB
  VERSION=\"${PROJECT_VERSION}\"
  $<$<CONFIG:Debug>:UNIFICATION_DEBUGGING>
  $<$<CONFIG:Debug>:_DEBUG>
  )

set(jbig2enc_LIBRARIES
  Leptonica::Leptonica
  )

if (WIN32)
  add_definitions(-DWIN32)
  list(APPEND jbig2enc_LIBRARIES ws2_32)
endif ()

if (MSVC)
  add_definitions(-D_SCL_SECURE_NO_WARNINGS)
endif ()

source_group(TREE "${CMAKE_CURRENT_SOURCE_DIR}" FILES ${jbig2enc_PUBLIC_HEADERS} ${jbig2enc_HEADERS} ${jbig2enc_SOURCES} ${jbig2enc_DATAFILES})
add_library(jbig2enc SHARED ${jbig2enc_PUBLIC_HEADERS} ${jbig2enc_HEADERS} ${jbig2enc_SOURCES} ${jbig2enc_DATAFILES})
target_include_directories(jbig2enc PUBLIC "$<BUILD_INTERFACE:${jbig2enc_INCLUDES}>")
target_compile_definitions(jbig2enc PRIVATE "${jbig2enc_DEFINITIONS}")
target_link_libraries(jbig2enc PUBLIC ${jbig2enc_LIBRARIES})
set_target_properties(jbig2enc PROPERTIES PUBLIC_HEADER ${jbig2enc_PUBLIC_HEADERS})
set_target_properties(jbig2enc PROPERTIES VERSION ${PROJECT_VERSION} SOVERSION ${PROJECT_VERSION_MAJOR})
set_property(TARGET jbig2enc PROPERTY POSITION_INDEPENDENT_CODE ON)

add_library(JBig2Enc::JBig2Enc ALIAS jbig2enc)

source_group(TREE "${CMAKE_CURRENT_SOURCE_DIR}" FILES src/jbig2.cc)
add_executable(jbig2 src/jbig2.cc)
target_link_libraries(jbig2 PRIVATE jbig2enc)

install(TARGETS jbig2enc
  RUNTIME DESTINATION "${CMAKE_INSTALL_BINDIR}"
  LIBRARY DESTINATION "${CMAKE_INSTALL_LIBDIR}"
  ARCHIVE DESTINATION "${CMAKE_INSTALL_LIBDIR}"
  PUBLIC_HEADER DESTINATION "${CMAKE_INSTALL_INCLUDEDIR}"
  )
