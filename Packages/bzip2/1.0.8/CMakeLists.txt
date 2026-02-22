cmake_minimum_required(VERSION 3.10)
project(bzip2 VERSION 1.0.8 LANGUAGES C)

include(GNUInstallDirs)

option(BZIP2_BUILD_BZIP2RECOVER "Build bzip2recover" OFF)
option(BZIP2_BUILD_BZIP2 "Build bzip2" OFF)

if (NOT (DEFINED BUILD_STATIC OR BUILD_SHARED))
  set(BUILD_STATIC ON)
elseif (NOT (BUILD_STATIC OR BUILD_SHARED))
  message(FATAL_ERROR "No static or shared library was specified")
endif ()

set(bzip2_HEADERS
  bzlib.h
  )

set(bzip2_SOURCES
  bzlib_private.h
  blocksort.c
  bzlib.c
  compress.c
  crctable.c
  decompress.c
  huffman.c
  randtable.c
  )

set(bzip2_DATAFILES
  bz-common.xsl
  bzdiff
  bzdiff.1
  bz-fo.xsl
  bzgrep
  bzgrep.1
  bz-html.xsl
  bzip.css
  bzip2.1
  bzip2.1.preformatted
  bzip2.txt
  bzmore
  bzmore.1
  CHANGES
  dlltest.dsp
  entities.xml
  format.pl
  libbz2.dsp
  LICENSE
  Makefile
  makefile.msc
  Makefile-libbz2_so
  manual.html
  manual.pdf
  manual.ps
  manual.xml
  README
  README.COMPILATION.PROBLEMS
  README.XML.STUFF
  sample1.bz2
  sample1.ref
  sample2.bz2
  sample2.ref
  sample3.bz2
  sample3.ref
  words0
  words1
  words2
  words3
  xmlproc.sh
  )

set(bzip2_DEFINITIONS
  _FILE_OFFSET_BITS=64
  )

set(bzip2_INCLUDES
  "${CMAKE_CURRENT_BINARY_DIR}"
  "${CMAKE_CURRENT_SOURCE_DIR}"
  )

source_group(TREE "${CMAKE_CURRENT_SOURCE_DIR}" FILES ${bzip2_HEADERS} ${bzip2_SOURCES} ${bzip2_DATAFILES} libbz2.def)

add_library(bz2 OBJECT ${bzip2_HEADERS} ${bzip2_SOURCES})
target_include_directories(bz2 PUBLIC "$<BUILD_INTERFACE:${bzip2_INCLUDES}>")

if (BUILD_STATIC)
  add_library(bz2_static STATIC $<TARGET_OBJECTS:bz2> libbz2.def)
  set_target_properties(bz2_static PROPERTIES OUTPUT_NAME bz2)
  set_target_properties(bz2_static PROPERTIES PUBLIC_HEADER "${bzip2_HEADERS}")
  install(TARGETS bz2_static
    RUNTIME DESTINATION "${CMAKE_INSTALL_BINDIR}"
    LIBRARY DESTINATION "${CMAKE_INSTALL_LIBDIR}"
    ARCHIVE DESTINATION "${CMAKE_INSTALL_LIBDIR}"
    PUBLIC_HEADER DESTINATION "${CMAKE_INSTALL_INCLUDEDIR}"
    )
endif ()

if (BUILD_SHARED)
  add_library(bz2_shared SHARED $<TARGET_OBJECTS:bz2> libbz2.def)
  set_target_properties(bz2_shared PROPERTIES PUBLIC_HEADER "${bzip2_HEADERS}")
  set_target_properties(bz2_shared PROPERTIES VERSION ${PROJECT_VERSION} SOVERSION ${PROJECT_VERSION_MAJOR})
  set_target_properties(bz2_shared PROPERTIES OUTPUT_NAME bz2)
  install(TARGETS bz2_shared
    RUNTIME DESTINATION "${CMAKE_INSTALL_BINDIR}"
    LIBRARY DESTINATION "${CMAKE_INSTALL_LIBDIR}"
    ARCHIVE DESTINATION "${CMAKE_INSTALL_LIBDIR}"
    PUBLIC_HEADER DESTINATION "${CMAKE_INSTALL_INCLUDEDIR}"
    )
endif ()

if (BUILD_SHARED)
  add_library(BZip2::BZip2 ALIAS bz2_shared)
elseif (BUILD_STATIC)
  add_library(BZip2::BZip2 ALIAS bz2_static)
endif ()

if (BUILD_TESTING)
  source_group(TREE "${CMAKE_CURRENT_SOURCE_DIR}" FILES dlltest.c mk251.c spewG.c unzcrash.c)

  add_executable(dlltest dlltest.c)
  target_include_directories(dlltest PRIVATE ${bzip2_INCLUDES})
  target_link_libraries(dlltest PRIVATE BZip2::BZip2)

  add_executable(mk251 mk251.c)
  target_include_directories(mk251 PRIVATE ${bzip2_INCLUDES})

  add_executable(unzcrash unzcrash.c)
  target_include_directories(unzcrash PRIVATE ${bzip2_INCLUDES})
  target_link_libraries(unzcrash PRIVATE BZip2::BZip2)

  install(TARGETS dlltest mk251 unzcrash RUNTIME DESTINATION "${CMAKE_INSTALL_BINDIR}")

  if (UNIX)
    add_executable(spewG spewG.c)
    target_include_directories(spewG PRIVATE ${bzip2_INCLUDES})
    install(TARGETS spewG RUNTIME DESTINATION "${CMAKE_INSTALL_BINDIR}")
  endif ()
endif ()

if (BZIP2_BUILD_BZIP2RECOVER)
  source_group(TREE "${CMAKE_CURRENT_SOURCE_DIR}" FILES bzip2recover.c)
  add_executable(bzip2recover bzip2recover.c)
  target_include_directories(bzip2recover PRIVATE ${bzip2_INCLUDES})
  install(TARGETS bzip2recover RUNTIME DESTINATION "${CMAKE_INSTALL_BINDIR}")
endif ()

if (BZIP2_BUILD_BZIP2)
  source_group(TREE "${CMAKE_CURRENT_SOURCE_DIR}" FILES bzip2.c)
  add_executable(bzip2 bzip2.c)
  target_include_directories(bzip2 PRIVATE "$<BUILD_INTERFACE:${bzip2_INCLUDES}>")
  target_link_libraries(bzip2 PRIVATE BZip2::BZip2)
  install(TARGETS bzip2 RUNTIME DESTINATION "${CMAKE_INSTALL_BINDIR}")
endif ()
